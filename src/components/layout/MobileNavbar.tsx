"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/Logo";
import { navLinks } from "@/components/layout/nav-links";
import { scrollToVisibleSection } from "@/components/layout/scroll-to-section";

export function MobileNavbar() {
  const [open, setOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    // The sheet's close transition is duration-200 and Radix keeps the
    // background scroll-locked until it fully closes — scrolling before
    // then gets discarded when the lock releases and restores wherever
    // the page was when the sheet opened. Wait it out before scrolling.
    setTimeout(() => scrollToVisibleSection(href), 250);
  }

  return (
    <header className="flex w-full items-center justify-between border-b border-[#e8dfc8] bg-white px-5 py-3.5">
      <Logo tone="dark" size="sm" />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="text-forest-green hover:bg-forest-green/10"
          >
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-cream">
          <SheetHeader>
            <SheetTitle>
              <Logo tone="dark" size="sm" />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-lg px-2 py-3 text-base font-medium text-forest-green hover:bg-forest-green/5"
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
          </nav>
          <Separator className="mx-4 w-auto" />
          <div className="px-4 pb-4">
            <SheetClose asChild>
              <Button
                asChild
                variant="outline"
                className="h-auto w-full rounded-lg border-forest-green bg-transparent py-2.5 text-base text-forest-green hover:bg-forest-green/10 hover:text-forest-green"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
