import Link from "next/link";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container page-section--compact">
      <header className="page-intro">
        <p className="eyebrow">CUSTOMER SUPPORT</p>
        <h1>We’re here to help.</h1>
        <p>For product questions and order enquiries, contact the Naffeez team.</p>
      </header>
      <div className="empty-state">
        <h2>WhatsApp support</h2>
        <p>Use the official Naffeez WhatsApp support channel for enquiries.</p>
        <Link className="button button--primary" href="https://wa.me/923716492220" target="_blank" rel="noreferrer">Message Naffeez ↗</Link>
        <p><a href="mailto:naffeezofficial@gmail.com">naffeezofficial@gmail.com</a></p>
      </div>
    </div>
  );
}