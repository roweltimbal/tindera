import { InventoryDesktop } from "@/components/inventory/InventoryDesktop";
import { InventoryMobile } from "@/components/inventory/InventoryMobile";
import { getProductsByStore } from "@/lib/products/product-service"
;


export default async function InventoryPage({ searchParams }: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
const { search, category } = await searchParams;

const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands

const products = await getProductsByStore(STORE_ID, {search, category});

  return (
    <>
      <div className="flex lg:hidden">
        <InventoryMobile />
      </div>
      <div className="hidden lg:flex">
        <InventoryDesktop products={products}/>
      </div>
    </>
  );
}
