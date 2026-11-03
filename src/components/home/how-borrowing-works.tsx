const steps = [
  {
    step: "01",
    title: "Find a book",
    text: "Search by title or author, or pick a category, then open the book.",
  },
  {
    step: "02",
    title: "Confirm the borrow",
    text: "Your name and email are filled in already. The return date is seven days later.",
  },
  {
    step: "03",
    title: "Return it",
    text: "Press Return Book in My Borrows and the copy goes back on the shelf.",
  },
];

export function HowBorrowingWorks() {
  return (
    <section id="how-it-works" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs tracking-widest text-ochre uppercase">
          How borrowing works
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
          Borrowing a book takes three steps
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-primary-foreground/20 p-7"
            >
              <span className="font-mono text-sm text-ochre">{item.step}</span>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
