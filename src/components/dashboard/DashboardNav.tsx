"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-54 shrink-0 flex-col gap-10 bg-forest-green px-6 py-10 lg:sticky lg:top-0 lg:h-screen">
      <p className="text-[22px] font-extrabold text-white">Tindera</p>

      <nav className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white">
          <LogOut className="size-[22px]" />
          <span className="text-[15px] font-medium">Log out</span>
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3",
                isActive
                  ? "bg-gold-yellow text-forest-green"
                  : "text-white"
              )}
            >
              <Icon className="size-[22px]" />
              <span
                className={cn(
                  "text-[15px]",
                  isActive ? "font-bold" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function DashboardTabBar() {
  const pathname = usePathname();
  const [inventory, recordSale, lowStock, profile] = NAV_ITEMS;
  const mobileNavItems = [profile, inventory, recordSale, lowStock];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-tab-bar">
      <div className="flex h-[72px] items-center justify-between px-3 pt-3 pb-5">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <Icon
                className={cn(
                  "size-6",
                  isActive ? "text-gold-yellow" : "text-muted-sage"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-gold-yellow" : "text-muted-sage"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-5 w-full" />
    </div>
  );
}
