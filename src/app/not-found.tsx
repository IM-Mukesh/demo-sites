import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div>
        <span className="eyebrow">A quiet wrong turn</span>
        <h1 className="display display-lg" style={{ marginTop: 20 }}>This page has not been drawn yet.</h1>
        <p>The route you followed does not belong to this concept website. Let&apos;s return to the beginning and find a better line through.</p>
        <Link className="button" href="/demo/architect-sector-57">Back to the home page <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
    </main>
  );
}
