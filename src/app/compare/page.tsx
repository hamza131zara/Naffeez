import { CompareView } from "@/components/compare-view";

export const metadata = { title: "Compare products" };

export default function ComparePage() {
  return (
    <div className="container page-section--compact">
      <header className="page-intro">
        <p className="eyebrow">PRODUCT COMPARISON</p>
        <h1>Compare selected pieces.</h1>
        <p>Compare up to four products. Missing product attributes are shown as not provided.</p>
      </header>
      <CompareView />
    </div>
  );
}