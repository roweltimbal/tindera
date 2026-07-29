import { RecordSaleDesktop } from "@/components/record-sale/RecordSaleDesktop";
import { RecordSaleMobile } from "@/components/record-sale/RecordSaleMobile";
import { getProductsByStore } from "@/lib/products/product-service";
import { getUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function RecordSalePage({ searchParams }: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const { search, category } = await searchParams;

  const userSession = await getUserSession();
  if (!userSession) {
    redirect("/sign-in");
  }

  const STORE_ID = userSession.storeId;

  const { products } = await getProductsByStore(STORE_ID, { search, category, allResults: true });

  return (
    <>
      <div className="flex lg:hidden">
        <RecordSaleMobile products={products} />
      </div>
      <div className="hidden lg:flex">
        <RecordSaleDesktop products={products} />
      </div>
    </>
  );
}
