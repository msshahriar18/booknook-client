"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import {
  Dialog,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IBook } from "@/lib/types/book";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const EditBookDialog = ({ book }: { book: IBook }) => {
  const [form, setForm] = useState(book);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { _id, createdAt, ...rest } = form;

    const borrowed = book.totalCopies - book.availableCopies;
    const totalCopies = Number(rest.totalCopies);

    if (totalCopies < borrowed) {
      toast.add({
        title: "Too few copies",
        description: `${borrowed} copies are still out on loan.`,
      });
      return;
    }

    const updatedData = {
      ...rest,
      totalCopies,
      availableCopies: totalCopies - borrowed,
    };

    const token = await getTokenFromClient();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      },
    );

    await res.json();

    setOpen(false);
    toast.add({ title: "Book updated", description: `${form.title} is saved.` });
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Pencil />
            Edit
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>
            Change the details and save, the shelf updates right away.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="editTitle">Book title</Label>
              <Input
                id="editTitle"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="editAuthor">Author name</Label>
                <Input
                  id="editAuthor"
                  value={form.author}
                  onChange={(event) => update("author", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Fiction" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editImage">Image URL</Label>
              <Input
                id="editImage"
                type="url"
                value={form.imageUrl}
                onChange={(event) => update("imageUrl", event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editDescription">Short description</Label>
              <Textarea
                id="editDescription"
                className="min-h-28"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editCopies">Total copies</Label>
              <Input
                id="editCopies"
                type="number"
                min="1"
                value={form.totalCopies}
                onChange={(event) => update("totalCopies", event.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
