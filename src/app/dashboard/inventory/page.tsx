import { InventoryDesktop } from "@/components/inventory/InventoryDesktop";
import { InventoryMobile } from "@/components/inventory/InventoryMobile";
import { getDb } from "@/lib/db";
import { ObjectId, Decimal128 } from "mongodb";

// Interface of the rawProducts array from the db
interface ProductDocument {
  _id: ObjectId;
  storeId: ObjectId;
  productName: string;
  category: "Food & Snacks" | "Beverages" | "Cleaning Products" | "Alcohol";
  price: Decimal128;
  quantity: number;
  threshold: number;
}

// Inventory page — product list, add/edit UI
export default async function InventoryPage() {
  const db = await getDb();
  const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands 
  const rawProducts = await db.collection<ProductDocument>("products").find({storeId: new ObjectId(STORE_ID)}).toArray();
  const products = rawProducts.map(product => (
    {
      ...product,
      _id: product._id.toString(),
      storeId: product.storeId.toString(),
      price: parseFloat(product.price.toString())
    }
  ))


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
