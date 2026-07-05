import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/layout/Logo";
import { navLinks } from "@/components/layout/nav-links";

export function DesktopNavbar() {
  return (
    <header className="flex w-full items-center justify-between bg-forest-green px-6 py-3.5">
      <Logo tone="light" size="sm" />
      <div className="flex items-center gap-8">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-8">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  href={link.href}
                  className="bg-transparent p-0 text-base font-normal text-white hover:bg-transparent hover:text-white focus:bg-transparent"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="outline"
          className="h-auto rounded-none border-white bg-transparent px-5 py-2 text-base font-normal text-white hover:bg-white/10 hover:text-white"
        >
          Sign in
        </Button>
      </div>
    </header>
  );
}
