import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-14">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Have a shelf of your own?
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Register once, add a book in under a minute, and your neighbours can
            borrow it the same day.
          </p>
        </div>
        <Button size="lg" render={<Link href="/register">Create an account</Link>} />
      </div>
    </section>
  );
}
