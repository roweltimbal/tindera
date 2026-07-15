"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductSearchInput({ className }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "flex h-12 items-center gap-2 rounded-xl border border-border-tan bg-white px-4",
            className
          )}
        >
          <Search className="size-4 text-muted-sage" />
          <span className="text-sm text-muted-sage">Search products...</span>
        </div>
      }
    >
      <ProductSearchInputField className={className} />
    </Suspense>
  );
}

function ProductSearchInputField({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);
  }

  return (
    <div
      className={cn(
        "flex h-12 items-center gap-2 rounded-xl border border-border-tan bg-white px-4",
        className
      )}
    >
      <Search className="size-4 text-muted-sage" />
      <input
        type="text"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full bg-transparent text-sm text-forest-green placeholder:text-muted-sage focus:outline-none"
      />
    </div>
  );
}
