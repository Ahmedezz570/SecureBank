import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const HeroContent = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="mx-auto space-y-10 max-w-3xl">
        <h1 className="text-5xl font-bold md:text-6xl tracking-tight">
          Banking Made Simple,
          <span className="block bg-blue-500 bg-clip-text text-transparent">
            Secure & Intelligent
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Experience the future of banking with our comprehensive payment
          management system. Secure transfers, 24/7 support, and intelligent
          automation at your fingertips.
        </p>
      </div>
      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-center">
        <Button size="lg" className="text-lg" asChild>
          <Link href="/Register">Open Account</Link>
        </Button>
        <Button size="lg" variant="outline" className="text-lg" asChild>
          <Link href="/login">Access Dashboard</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroContent;
