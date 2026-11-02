import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookCard } from "@/components/book/book-card";
import { buttonVariants } from "@/components/ui/button";
import type { IBook } from "@/lib/types/book";

export async function NewArrivals() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
    cache: "no-store",
  });
  const books: IBook[] = await res.json();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-widest text-ochre uppercase">
            New arrivals
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Just added to the shelves
          </h2>
        </div>
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          See all books
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/books" className={buttonVariants({ size: "lg" })}>
          See All Books
        </Link>
      </div>
    </section>
  );
}

export function NewArrivalsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
      <div className="mt-4 h-10 w-96 max-w-full animate-pulse rounded-md bg-muted" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
