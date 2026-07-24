import { InventoryDesktop } from "@/components/inventory/InventoryDesktop";
import { InventoryMobile } from "@/components/inventory/InventoryMobile";
import { getProductsByStore } from "@/lib/products/product-service";
import { getUserSession } from "@/lib/auth/session"
import {redirect } from "next/navigation"


export default async function InventoryPage({ searchParams }: {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>
}) {
const { search, category, page } = await searchParams;

const parsedPage = Number(page);
const requestedPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;


const userSession = await getUserSession();
if(!userSession) {
  redirect("/sign-in")
}

const STORE_ID = userSession.storeId

let { products, totalCount, totalPages } = await getProductsByStore(STORE_ID, {search, category, currentPage: requestedPage});

let currentPage = requestedPage;

if (products.length === 0 && totalCount > 0 && requestedPage > totalPages) {
  currentPage = totalPages;
  ({ products, totalCount, totalPages } = await getProductsByStore(STORE_ID, {search, category, currentPage}));
}

  return (
    <>
      <div className="flex lg:hidden">
        <InventoryMobile products={products} currentPage={currentPage} totalPages={totalPages} totalCount={totalCount} />
      </div>
      <div className="hidden lg:flex">
        <InventoryDesktop products={products} currentPage={currentPage} totalPages={totalPages} totalCount={totalCount}/>
      </div>
    </>
  );
}
