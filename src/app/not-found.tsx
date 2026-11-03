import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "BookNook | Page not found",
};

export default function NotFound() {
  return (
    <main className="w-full mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-widest text-ochre uppercase">
        Error 404
      </p>
      <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Back to Home
        </Link>
        <Link
          href="/books"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Browse all books
        </Link>
      </div>
    </main>
  );
}
