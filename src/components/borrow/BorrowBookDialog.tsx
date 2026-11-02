"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookMarked } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IBook } from "@/lib/types/book";

const BorrowBookDialog = ({ book }: { book: IBook }) => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const user = session?.user;
  const available = book.availableCopies > 0;

  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 7);

  const handleBorrow = async () => {
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId: book._id }),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.add({ title: "Could not borrow", description: result.msg });
      return;
    }

    setOpen(false);
    toast.add({
      title: "Book borrowed",
      description: `Return ${book.title} by ${returnDate.toDateString()}.`,
    });
    router.push("/my-borrows");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="lg" disabled={!available}>
            <BookMarked />
            {available ? "Borrow This Book" : "Not Available"}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow this book</DialogTitle>
          <DialogDescription>
            {book.title} by {book.author}, due back in seven days.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="borrower">Your name</Label>
            <Input id="borrower" value={user?.name ?? ""} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="borrowerEmail">Your email</Label>
            <Input id="borrowerEmail" value={user?.email ?? ""} readOnly />
          </div>
          <div className="flex justify-between rounded-lg border border-border bg-muted px-4 py-3 text-sm">
            <span className="text-muted-foreground">Return date</span>
            <span className="font-medium">{returnDate.toDateString()}</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleBorrow}>Confirm Borrow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
