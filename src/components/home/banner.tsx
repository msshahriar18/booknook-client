"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { buttonVariants } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Borrow books from your neighbours",
    text: "Every book here belongs to someone nearby. Pick one, keep it for seven days and return it.",
  },
  {
    eyebrow: "Share your shelf",
    title: "Add your own books",
    text: "Put up the books you are done with and let someone else read them next.",
  },
  {
    eyebrow: "Seven day loans",
    title: "Keep track of what is due",
    text: "My Borrows shows every book you have taken and the date it has to go back.",
  },
];

export function Banner() {
  return (
    <section className="border-b border-border bg-paper">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className="mx-auto max-w-7xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="grid gap-10 px-6 py-16 pb-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="font-mono text-xs tracking-widest text-ochre uppercase">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-4 text-4xl leading-tight font-semibold md:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                  {slide.text}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/books" className={buttonVariants({ size: "lg" })}>
                    Browse Books
                  </Link>
                  <Link
                    href="#how-it-works"
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    How borrowing works
                  </Link>
                </div>
              </div>

              <div className="hidden justify-center gap-5 lg:flex">
                <div className="h-64 w-44 -rotate-4 rounded-md bg-[#2d4739]" />
                <div className="h-72 w-48 self-center rounded-md bg-[#4a3b2a]" />
                <div className="h-64 w-44 rotate-4 rounded-md bg-[#3a3f58]" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
