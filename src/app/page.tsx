import { Suspense } from "react";
import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import { HowBorrowingWorks } from "@/components/home/how-borrowing-works";
import { NewArrivals, NewArrivalsSkeleton } from "@/components/home/new-arrivals";
import { TopCategories } from "@/components/home/top-categories";

export default function Home() {
  return (
    <main>
      <Banner />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>
      <HowBorrowingWorks />
      <TopCategories />
      <Cta />
    </main>
  );
}
