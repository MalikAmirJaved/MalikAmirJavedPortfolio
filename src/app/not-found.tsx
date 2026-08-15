import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-grid relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative text-center">
        <p className="text-gradient font-serif text-8xl font-medium sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back to something that does.
        </p>
        <Button size="lg" asChild className="mt-8">
          <Link href="/">
            <LuArrowLeft className="size-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  );
}
