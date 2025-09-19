"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { BookOpen } from "lucide-react";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-emerald-900 bg-black/60 backdrop-blur-md px-6 py-4">
      {/* Logo Section */}
      <div className="flex items-center gap-2 text-2xl font-bold text-white">
        <BookOpen className="h-7 w-7 text-emerald-500" />
        <span className="tracking-wide">MANGA HUB</span>
      </div>

      {/* Auth Section */}
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}