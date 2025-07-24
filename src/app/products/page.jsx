"use client";

export const dynamic = "force-dynamic";

import AllFilteredProducts from "@/components/Product/AllFilteredProducts";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <AllFilteredProducts />
    </Suspense>
  );
};

export default Page;
