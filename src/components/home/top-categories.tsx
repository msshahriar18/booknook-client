import Link from "next/link";
import { Baby, BookOpen, Landmark, Layers, Microscope } from "lucide-react";

const categories = [
  { name: "Fiction", text: "Novels and short stories", icon: BookOpen },
  { name: "Science", text: "Ideas and discovery", icon: Microscope },
  { name: "History", text: "People and periods", icon: Landmark },
  { name: "Kids", text: "Picture books and tales", icon: Baby },
  { name: "Others", text: "Everything else", icon: Layers },
];

export function TopCategories() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs tracking-widest text-ochre uppercase">
          Top categories
        </p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Pick a category
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/books?category=${category.name}`}
              className="rounded-xl border border-border bg-paper p-6 transition-colors hover:border-primary"
            >
              <category.icon className="size-5 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">{category.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
