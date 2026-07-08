import { Box, CircleAlert, SquarePlus, User, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Inventory", href: "/dashboard/inventory", icon: Box },
  { label: "Record Sale", href: "/dashboard/record-sale", icon: SquarePlus },
  { label: "Low Stock", href: "/dashboard/low-stock", icon: CircleAlert },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];
