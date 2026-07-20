import { InventoryDesktop } from "@/components/inventory/InventoryDesktop";
import { InventoryMobile } from "@/components/inventory/InventoryMobile";
import { getProductsByStore } from "@/lib/products/product-service"
;


export default async function InventoryPage({ searchParams }: {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>
}) {
const { search, category, page } = await searchParams;

const parsedPage = Number(page);
const requestedPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands

let { products, totalCount, totalPages } = await getProductsByStore(STORE_ID, {search, category, currentPage: requestedPage});

let currentPage = requestedPage;

if (products.length === 0 && totalCount > 0 && requestedPage > totalPages) {
  currentPage = totalPages;
  ({ products, totalCount, totalPages } = await getProductsByStore(STORE_ID, {search, category, currentPage}));
}

  return (
    <>
      <div className="flex lg:hidden">
        <InventoryMobile />
      </div>
      <div className="hidden lg:flex">
        <InventoryDesktop products={products} currentPage={currentPage} totalPages={totalPages} totalCount={totalCount}/>
      </div>
    </>
  );
}
