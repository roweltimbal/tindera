import { Menu } from "lucide-react";
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

export function MobileNavbar() {
  return (
    <header className="flex w-full items-center justify-between border-b border-[#e8dfc8] bg-white px-5 py-3.5">
      <Logo tone="dark" size="sm" />
      <Sheet>
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
                variant="outline"
                className="h-auto w-full rounded-lg border-forest-green bg-transparent py-2.5 text-base text-forest-green hover:bg-forest-green/10 hover:text-forest-green"
              >
                Sign in
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
