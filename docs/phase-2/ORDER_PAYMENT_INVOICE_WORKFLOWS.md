# Naffeez — Order, Payment, Inventory and Invoice Workflows

**Document ID:** NAF-P2-WORK-001  
**Version:** 0.1.0  
**Status:** Draft for owner review  
**Last updated:** 2026-11-28

## 1. Separate business state dimensions

Do not use one status field for the entire order.

### Fulfillment state

Proposed values:
- pending_confirmation
- confirmed
- processing
- shipped
- delivered
- cancelled

Return/exchange states require an owner-approved policy and may be added later.

### Payment state

Proposed values:
- cod_due — COD selected; customer owes amount on delivery.
- awaiting_transfer — QR payment selected; transfer not yet submitted.
- verification_pending — customer submitted transfer details/proof.
- verified — authorized admin confirmed actual receipt.
- rejected — submission rejected; new submission may be allowed.
- refund_pending / refunded — only after a refund policy/process exists.

A COD order is not Paid at order placement. A QR transfer is not Paid when the QR is displayed or proof is uploaded.

## 2. Purchase sequence

1. Customer browses catalog and opens Product Studio.
2. Customer chooses a valid variant and quantity.
3. Customer adds to cart.
4. Checkout quote is calculated on the server.
5. Customer enters contact and delivery details.
6. Customer chooses COD or a configured QR method.
7. Customer reviews the authoritative server quote.
8. Customer submits order using an idempotency key.
9. Server validates and commits the order transaction.
10. Server returns order reference, initial payment state and invoice access.
11. Invoice PDF is made available immediately or generated recoverably after order commit.

## 3. Atomic order transaction

A single transaction must:
- lock/check relevant inventory rows or use a race-safe conditional update;
- ensure requested variant is active/purchasable;
- ensure available quantity is sufficient;
- validate current price and totals;
- create order header;
- create immutable order item snapshots;
- create inventory reservation/movement entries;
- create initial payment record/event;
- allocate unique invoice number;
- create immutable invoice snapshot;
- persist idempotency result.

If any required database operation fails, no partial order or stock reservation remains. PDF generation/storage can happen after the transaction because a missing PDF must be regenerable from the invoice snapshot.

Use a transactionally safe function/database operation or server-only transaction. Do not create an order through unrelated parallel API calls.

## 4. Inventory lifecycle

The schema separates:
- quantity on hand;
- quantity reserved;
- available quantity = on hand - reserved.

Reservation policy is not fully decided. Proposed behavior:
- QR orders reserve stock for a configured period while awaiting transfer proof/verification.
- COD orders reserve stock while awaiting store confirmation, with a separate admin cancellation/release path.
- Admin can cancel/release reservation only with a reason and audit event.
- Delivery/cancellation finalization converts reservation to a stock decrement or release.
- Expired reservations release stock through a controlled job.
- Every adjustment is recorded in inventory movement ledger.

**Owner decision required:** reservation duration, when COD stock becomes committed, whether payment timeout cancels the order automatically, and who can override a reservation.

## 5. COD workflow

~~~mermaid
flowchart TD
 A[Customer selects COD] --> B[Server validates cart and address]
 B --> C[Atomic order creation]
 C --> D[Payment state: cod_due]
 D --> E[Order confirmation and invoice]
 E --> F[Admin confirms order]
 F --> G[Processing]
 G --> H[Shipped]
 H --> I[Delivered]
 I --> J[Admin records COD collection]
 J --> K[Payment state: collected/paid]
~~~

The final COD collection event should be recorded by an authorized staff action. Confirm how collection will be reconciled operationally; delivery partner integration is not assumed.

## 6. Easypaisa/bank QR transfer workflow

~~~mermaid
flowchart TD
 A[Customer selects QR method] --> B[Show active QR and instructions]
 B --> C[Customer scans with payment app]
 C --> D[Customer submits reference/proof]
 D --> E[Payment submission: pending]
 E --> F[Admin checks actual account receipt]
 F -->|Received| G[Verify]
 F -->|Not received / mismatch| H[Reject or request new proof]
 G --> I[Payment state: verified]
 H --> J[Payment state: rejected]
 J --> D
~~~

### QR UX considerations

- Desktop: display QR large enough to scan with a second device.
- Mobile: allow customer to save/open QR image or copy account/payment details; a customer cannot reliably point the same phone camera at its own screen.
- Show exact amount and order reference to help reconciliation.
- Never claim that scanning the QR completes payment.
- Admin must compare payment in the actual Easypaisa/bank account or trusted statement before verifying.
- Do not put production account/QR data in Git. The owner configures it through protected admin settings.

### Manual verification record

Each review stores submission ID, reviewer, review time, decision and reason. A submission may only be reviewed once per terminal state; customer resubmission creates a new attempt rather than mutating the old proof row.

## 7. Order cancellation and stock release

- Only allowed state transitions may be performed.
- Cancellation after shipment/delivery needs a separate return/refund policy.
- Releasing stock must be atomic and idempotent.
- Admin must enter a cancellation reason.
- Payment status remains separate; cancellation does not imply refund.
- If payment was verified, cancellation must create a refund decision/task; do not mark refunded before money is actually returned.

## 8. Invoice lifecycle

1. Allocate invoice number in the same transaction as the order record.
2. Store a snapshot of seller identity fields available, buyer/order information, item descriptions, SKU, chosen variant, quantities, unit prices, line totals, shipping/discount totals, final total and currency.
3. PDF generation consumes only this immutable snapshot plus allowed presentation/template settings.
4. Store the PDF in a private bucket or regenerate on demand.
5. Customer accesses only their invoice; admin can access based on role.
6. Record invoice view/download events only if operationally useful; do not log sensitive content.
7. Payment updates do not rewrite product/price snapshots.

### Payment status on invoice

The invoice's financial/order snapshot is immutable. Current payment state is displayed from the linked payment record at render time. If a payment status changes, the re-downloaded invoice may show the current status with a generated-at timestamp; a separate payment receipt is recommended after verified transfer. Exact legal/accounting treatment must be confirmed before production.

### Suggested numbering

NAF-YYYY-000001 is a proposal only. Use an atomic sequence/counter per year and unique constraint. Never build an invoice number from an unlocked MAX(number)+1 query.

## 9. Customer invoice access

- After order submission, show order reference and a View/Download Invoice action.
- Authenticated customer: ownership check from verified identity.
- Guest: order-specific high-entropy capability delivered in the active checkout session and a verified recovery path; never authorize by order number alone.
- PDF access uses an authorized response or short-lived signed private URL.
- Invoice includes COD due or QR pending/verified state without implying false payment completion.

## 10. Admin operational queues

Dashboard should surface:
- orders awaiting confirmation;
- payment submissions awaiting review;
- orders ready to process/ship;
- low-stock variants;
- invoice generation failures.

Each queue item links to a detail page and records operator actions.

## 11. Required workflow tests

- Two customers attempt to buy the last available unit concurrently; only permitted stock allocation succeeds.
- Duplicate checkout request with same idempotency key returns one order.
- Client changes unit price/total; server ignores and recalculates.
- COD placement produces unpaid/cod_due state.
- QR order with no proof remains awaiting transfer.
- QR proof submission produces pending verification, never verified.
- Authorized admin can verify once; second verification attempt is rejected safely.
- Rejected proof can be resubmitted as a new attempt.
- Order cancellation releases reservation exactly once.
- Invoice number remains unique under concurrent orders.
- Customer cannot access another customer's invoice.
- Missing PDF can be regenerated without changing invoice snapshot.
