import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { cn } from "~/lib/utils";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

export const metadata: Metadata = {
  title: "MangaHub",
  description: "Read your favorite manga online",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable} dark`}>
        <body
          className={cn(
            "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100 min-h-screen flex flex-col"
          )}
        >
          {/* Top Navigation */}
          <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6">
              <TopNav />
            </div>
          </header>

          

          {/* Page Layout */}
          <main className="flex-1 flex justify-center px-4 py-10">
            <div className="max-w-6xl w-full space-y-12">
              {children}

              {/* Featured Manga */}
              <section>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Featured <Badge variant="secondary">Hot</Badge>
                </h2>
                <Separator className="my-3 bg-gray-700" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "One Piece",
                      desc: "The adventures of Luffy and his pirate crew.",
                      img: "/onep.jpg",
                    },
                    {
                      title: "Attack on Titan",
                      desc: "Humanity’s struggle against titans.",
                      img: "/aot.jpg",
                    },
                    {
                      title: "Chainsaw Man",
                      desc: "Denji’s wild ride as Chainsaw Man.",
                      img: "/chm.jpg",
                    },
                  ].map((manga, idx) => (
                    <Card
                      key={idx}
                      className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform"
                    >
                      <div className="relative w-full h-52">
                        <Image
                          src={manga.img}
                          alt={manga.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{manga.title}</CardTitle>
                        <CardDescription>{manga.desc}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="secondary" className="w-full">
                          Read Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Latest Manga Grid */}
              <section>
                <h2 className="text-2xl font-bold">Latest Manga</h2>
                <Separator className="my-3 bg-gray-700" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {[
                    { title: "One Piece", img: "/onep.jpg" },
                    { title: "Naruto", img: "/narts.jpg" },
                    { title: "Attack on Titan", img: "/aot.jpg" },
                    { title: "Demon Slayer", img: "/ds.jpg" },
                    { title: "Jujutsu Kaisen", img: "/jjk.jpg" },
                    { title: "Chainsaw Man", img: "/chm.jpg" },
                  ].map((manga, idx) => (
                    <Card
                      key={idx}
                      className="bg-gray-900/70 border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      <div className="relative w-full h-64">
                        <Image
                          src={manga.img}
                          alt={manga.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm truncate">
                          {manga.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-800 bg-black/60 backdrop-blur-md py-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} MangaHub. All rights reserved.
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
