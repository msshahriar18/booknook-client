import { Suspense } from "react";
import type { Metadata } from "next";

import { BooksGrid } from "@/components/book/books-grid";
import type { IBook } from "@/lib/types/book";

export const metadata: Metadata = {
  title: "BookNook | All Books",
};

async function Books() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });
  const data: IBook[] = await res.json();

  return <BooksGrid books={data} />;
}

function BooksSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
      <div className="mt-4 h-12 w-80 max-w-full animate-pulse rounded-md bg-muted" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-10 animate-pulse rounded-lg border border-border bg-muted/50"
          />
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-xl border border-border bg-muted/50"
          />
        ))}
      </div>
    </section>
  );
}

export default function AllBooksPage() {
  return (
    <main>
      <Suspense fallback={<BooksSkeleton />}>
        <Books />
      </Suspense>
    </main>
  );
}
