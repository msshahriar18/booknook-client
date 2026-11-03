import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-14">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Want to share your books?
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Create an account, add your books and people nearby can borrow them.
          </p>
        </div>
        <Link href="/register" className={buttonVariants({ size: "lg" })}>
          Create an account
        </Link>
      </div>
    </section>
  );
}
