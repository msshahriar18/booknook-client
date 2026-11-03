"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookPlus } from "lucide-react";

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
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const initialForm = {
  title: "",
  author: "",
  category: "",
  totalCopies: "1",
  description: "",
};

const uploadCover = async (file: File) => {
  const body = new FormData();
  body.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body },
  );

  const result = await res.json();
  return result.data?.url as string | undefined;
};

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const [form, setForm] = useState(initialForm);
  const [cover, setCover] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const user = session?.user;

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cover) {
      toast.add({ title: "Pick a cover image for the book" });
      return;
    }

    setSaving(true);

    const imageUrl = await uploadCover(cover);
    if (!imageUrl) {
      setSaving(false);
      toast.add({ title: "Cover upload failed", description: "Try again in a moment." });
      return;
    }

    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        imageUrl,
        addedByName: user?.name,
        addedByEmail: user?.email,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      toast.add({ title: "Could not add the book" });
      return;
    }

    await res.json();
    toast.add({
      title: "Book added",
      description: `${form.title} is on the shelf now.`,
    });
    setForm(initialForm);
    setCover(null);
    router.push("/my-books");
  };

  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs tracking-widest text-ochre uppercase">
          Private route
        </p>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
          Add a Book
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your name and email come from your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-xl border border-border bg-card p-8"
        >
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="title">Book title</Label>
              <Input
                id="title"
                placeholder="Treasure Island"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="author">Author name</Label>
                <Input
                  id="author"
                  placeholder="R. L. Stevenson"
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="totalCopies">Total copies</Label>
                <Input
                  id="totalCopies"
                  type="number"
                  min="1"
                  value={form.totalCopies}
                  onChange={(event) => update("totalCopies", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cover">Book image</Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setCover(event.target.files?.[0] ?? null)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Short description</Label>
              <Textarea
                id="description"
                placeholder="Write a few lines about the book."
                className="min-h-32"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="owner">Your name</Label>
                <Input id="owner" value={user?.name ?? ""} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ownerEmail">Your email</Label>
                <Input id="ownerEmail" value={user?.email ?? ""} readOnly />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/my-books")}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              <BookPlus />
              {saving ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
