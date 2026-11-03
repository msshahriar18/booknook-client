"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [form, setForm] = useState({ name: "", image: "" });
  const [edited, setEdited] = useState(false);
  const [saving, setSaving] = useState(false);

  const user = session?.user;

  const name = edited ? form.name : (user?.name ?? "");
  const image = edited ? form.image : (user?.image ?? "");

  const update = (field: "name" | "image", value: string) => {
    setForm({ name, image, [field]: value });
    setEdited(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const { error } = await authClient.updateUser({ name, image });

    setSaving(false);

    if (error) {
      toast.add({ title: "Could not save", description: error.message });
      return;
    }

    setEdited(false);
    toast.add({ title: "Profile updated", description: "Your details are saved." });
  };

  if (isPending) {
    return (
      <main className="w-full mx-auto max-w-2xl px-6 py-16">
        <div className="h-10 w-56 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 h-72 animate-pulse rounded-xl border border-border bg-muted/50" />
      </main>
    );
  }

  return (
    <main className="w-full mx-auto max-w-2xl px-6 py-12">
      <p className="font-mono text-xs tracking-widest text-ochre uppercase">
        Private route
      </p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">My Profile</h1>
      <p className="mt-3 text-muted-foreground">
        Change the name and picture other readers see next to your books.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-xl border border-border bg-card p-8"
      >
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage referrerPolicy="no-referrer" src={image} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => update("name", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Photo URL</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://i.ibb.co/your-photo.jpg"
              value={image}
              onChange={(event) => update("image", event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email ?? ""} readOnly />
            <p className="text-sm text-muted-foreground">
              Your email is tied to your books and borrows, so it cannot be
              changed here.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={saving}>
            <Save />
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </main>
  );
}
