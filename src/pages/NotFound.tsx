import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-7xl font-black tracking-tighter">404</h1>
        <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-background">Go home</Link>
      </div>
    </SiteLayout>
  );
}
