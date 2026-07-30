export type ProductCategory =
  | "Food & Snacks"
  | "Beverages"
  | "Alcohol"
  | "Cleaning Products";

export interface Product {
  productName: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  threshold: number;
}

export function isLowStock(product: Pick<Product, "quantity" | "threshold">) {
  return product.quantity <= product.threshold;
}

export interface CategoryFilter {
  label: string;
  value: ProductCategory | "All";
}

export const CATEGORY_FILTERS: CategoryFilter[] = [
  { label: "All", value: "All" },
  { label: "Food & Snacks", value: "Food & Snacks" },
  { label: "Beverages", value: "Beverages" },
  { label: "Alcohol", value: "Alcohol" },
  { label: "Cleaning", value: "Cleaning Products" },
];
