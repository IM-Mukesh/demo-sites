"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the visible error state useful without logging private form or project data.
    void error.digest;
  }, [error]);

  return (
    <main className="not-found-page">
      <div><span className="eyebrow">A temporary interruption</span><h1 className="display display-md" style={{ marginTop: 20 }}>The drawing needs another pass.</h1><p>Something prevented this view from loading. Try again, or return to the concept home page.</p><div className="button-row" style={{ justifyContent: "center" }}><button className="button" type="button" onClick={() => reset()}>Try again</button><Link className="button button--outline" href="/demo/architect-sector-57">Back home <ArrowUpRight size={15} aria-hidden="true" /></Link></div></div>
    </main>
  );
}
