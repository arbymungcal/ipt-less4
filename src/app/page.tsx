"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

function RedirectToKeys() {
  const router = useRouter();
  useEffect(() => {
    router.push("/keys");
  }, [router]);
  return null;
}

export default function HomePage() {
  return (
    
    <main className="">
      {/* Hero Section */}
          <section className="relative h-64 md:h-96 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
                Welcome to <span className="text-indigo-500">MangaHub</span>
              </h1>
              <p className="mt-4 text-gray-300 max-w-xl text-lg">
                Explore thousands of manga, from timeless classics to the latest
                trending series.
              </p>
              <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg px-6 py-2">
                Start Reading
              </Button>
            </div>
          </section>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please Sign in First
        </div>
      </SignedOut>
      <SignedIn>
        <RedirectToKeys />
      </SignedIn>
    </main>
  );
}
