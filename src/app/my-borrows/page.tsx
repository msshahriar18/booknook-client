import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReturnBookButton from "@/components/borrow/ReturnBookButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { IBorrow } from "@/lib/types/borrow";

export const metadata = {
  title: "BookNook | My Borrows",
};

const MyBorrowsPage = async () => {
  const token = await getTokenFromServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const borrows: IBorrow[] = await res.json();

  return (
    <main className="w-full mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-widest text-ochre uppercase">
            Private route
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">My Borrows</h1>
          <p className="mt-3 text-muted-foreground">
            The books you have borrowed and when they are due back.
          </p>
        </div>
        <Link href="/books" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Borrow another book
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Borrowed on</TableHead>
              <TableHead>Return by</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrows.map((borrow) => (
              <TableRow key={borrow._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={borrow.imageUrl}
                      alt={borrow.title}
                      width={44}
                      height={62}
                      className="h-16 w-11 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{borrow.title}</p>
                      <p className="text-sm text-muted-foreground">
                        by {borrow.author}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(borrow.borrowDate).toDateString()}
                </TableCell>
                <TableCell className="font-medium">
                  {new Date(borrow.returnDate).toDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <ReturnBookButton id={borrow._id} title={borrow.title} />
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

export default MyBorrowsPage;
