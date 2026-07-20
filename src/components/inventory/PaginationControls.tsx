"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
        className="h-auto rounded-lg border-border-tan px-4 py-2 text-[13px] font-normal text-body-sage"
      >
        Previous
      </Button>
      <Button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-auto rounded-lg bg-forest-green px-4 py-2 text-[13px] font-bold text-white hover:bg-forest-green/90"
      >
        Next
      </Button>
    </div>
  );
}
