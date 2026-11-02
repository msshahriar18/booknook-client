import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookCopy, CalendarDays, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import BorrowBookDialog from "@/components/borrow/BorrowBookDialog";
import type { IBook } from "@/lib/types/book";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export const metadata = {
  title: "BookNook | Book Details",
};

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = await getTokenFromServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) notFound();
  const book: IBook = await res.json();

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <Link
        href="/books"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to All Books
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[380px_1fr]">
        <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{book.category}</Badge>
            <span className="font-mono text-xs tracking-wide text-ochre uppercase">
              {book.availableCopies > 0
                ? `${book.availableCopies} copies available`
                : "Not available"}
            </span>
          </div>

          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
            {book.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>

          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            {book.description}
          </p>

          <ul className="mt-8 grid max-w-xl gap-3 text-sm">
            <li className="flex items-center justify-between border-b border-border pb-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Layers className="size-4" />
                Total copies
              </span>
              <span className="font-medium">{book.totalCopies}</span>
            </li>
            <li className="flex items-center justify-between border-b border-border pb-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <BookCopy className="size-4" />
                Available now
              </span>
              <span className="font-medium">{book.availableCopies}</span>
            </li>
            <li className="flex items-center justify-between border-b border-border pb-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="size-4" />
                Loan period
              </span>
              <span className="font-medium">7 days</span>
            </li>
          </ul>

          <div className="mt-8 rounded-xl border border-border p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Added by
            </p>
            <p className="mt-2 font-medium">{book.addedByName}</p>
            <p className="text-sm text-muted-foreground">{book.addedByEmail}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <BorrowBookDialog book={book} />
            <Link
              href="/books"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Back to all books
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
