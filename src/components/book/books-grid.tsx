"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "cn";
import { BookCard } from "@/components/book/book-card";
import { Input } from "@/components/ui/input";
import type { IBook } from "@/lib/types/book";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];

export function BooksGrid({ books }: { books: IBook[] }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get("category") ?? "All",
  );
  const [search, setSearch] = useState("");

  const shown = books.filter((book) => {
    const inCategory = category === "All" || book.category === category;
    const term = search.toLowerCase();
    const matches =
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term);

    return inCategory && matches;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <p className="font-mono text-xs tracking-widest text-ochre uppercase">
        The shelves
      </p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">All Books</h1>
      <p className="mt-3 text-muted-foreground">
        Every book on BookNook, newest first.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or author"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                category === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary hover:text-primary",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {shown.length} books
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}
