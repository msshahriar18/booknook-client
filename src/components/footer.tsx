import Link from "next/link";
import { BookMarked, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <BookMarked className="size-6 text-ochre" />
            <span className="font-heading text-xl font-semibold text-background">
              BookNook
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A small online library. Add a book, borrow a book, return a book.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-base font-semibold text-background">
            Contact
          </h3>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="size-4" />
              hello@booknook.app
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" />
              +880 1700 000 000
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" />
              12 Reading Lane, Dhaka
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-base font-semibold text-background">
            Follow us
          </h3>
          <div className="mt-4 flex gap-3">
            <a
              href="https://x.com"
              aria-label="BookNook on X"
              className="flex size-10 items-center justify-center rounded-lg border border-background/20 transition-colors hover:border-ochre"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current">
                <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.5 3h6.4l4.4 5.8L17.5 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3Z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              aria-label="BookNook on Facebook"
              className="flex size-10 items-center justify-center rounded-lg border border-background/20 transition-colors hover:border-ochre"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.03 1.46-4.03 4.14V9.9H7.5V13h2.75v8h3.25Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="BookNook on Instagram"
              className="flex size-10 items-center justify-center rounded-lg border border-background/20 transition-colors hover:border-ochre"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.55.21.95.47 1.36.88.41.41.67.81.88 1.36.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.7 3.7 0 0 1-.88 1.36c-.41.41-.81.67-1.36.88-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.7 3.7 0 0 1-1.36-.88 3.7 3.7 0 0 1-.88-1.36c-.17-.4-.37-1-.42-2.2C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.21-.55.47-.95.88-1.36.41-.41.81-.67 1.36-.88.4-.17 1-.37 2.2-.42C8.4 2.21 8.8 2.2 12 2.2Zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44Zm6.75-10.97a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/15">
        <p className="mx-auto max-w-7xl px-6 py-6 text-sm">
          &copy; {new Date().getFullYear()} BookNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
