"use client";

import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const ReturnBookButton = ({ id, title }: { id: string; title: string }) => {
  const router = useRouter();

  const handleReturn = async () => {
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      toast.add({ title: "Could not return", description: result.msg });
      return;
    }

    toast.add({ title: "Book returned", description: `${title} is back on the shelf.` });
    router.refresh();
  };

  return (
    <Button size="sm" onClick={handleReturn}>
      <Undo2 />
      Return Book
    </Button>
  );
};

export default ReturnBookButton;
