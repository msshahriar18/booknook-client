import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { IBook } from "@/lib/types/book";

export function BookCard({ book }: { book: IBook }) {
  const available = book.availableCopies > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative h-56 w-full bg-muted">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{book.category}</Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {available
              ? `${book.availableCopies} copies left`
              : "Not available"}
          </span>
        </div>

        <h3 className="text-xl leading-snug font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">by {book.author}</p>

        <Link
          href={`/books/${book._id}`}
          className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary"
        >
          View Details
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
