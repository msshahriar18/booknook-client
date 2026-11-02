import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { BookPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditBookDialog from "@/components/book/EditBookDialog";
import DeleteBookDialog from "@/components/book/DeleteBookDialog";
import { auth } from "@/lib/auth";
import type { IBook } from "@/lib/types/book";

export const metadata = {
  title: "BookNook | My Books",
};

const MyBooksPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books?email=${user?.email}`,
    { cache: "no-store" },
  );
  const books: IBook[] = await res.json();

  return (
    <main className="w-full mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-widest text-ochre uppercase">
            Private route
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">My Books</h1>
          <p className="mt-3 text-muted-foreground">
            The books you have put up for borrowing.
          </p>
        </div>
        <Link href="/add-book" className={buttonVariants({ size: "lg" })}>
          <BookPlus />
          Add Book
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      width={44}
                      height={62}
                      className="h-16 w-11 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">
                        by {book.author}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{book.category}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {book.availableCopies} of {book.totalCopies} left
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <EditBookDialog book={book} />
                    <DeleteBookDialog id={book._id} title={book.title} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default MyBooksPage;
