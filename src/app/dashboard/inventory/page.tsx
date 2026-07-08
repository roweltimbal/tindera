import { InventoryDesktop } from "@/components/inventory/InventoryDesktop";
import { InventoryMobile } from "@/components/inventory/InventoryMobile";

// Inventory page — product list, add/edit UI
export default function InventoryPage() {
  return (
    <>
      <div className="flex lg:hidden">
        <InventoryMobile />
      </div>
      <div className="hidden lg:flex">
        <InventoryDesktop />
      </div>
    </>
  );
}
