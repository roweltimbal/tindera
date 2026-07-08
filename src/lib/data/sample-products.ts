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

export const sampleProducts: Product[] = [
  { productName: "Pancit Canton", category: "Food & Snacks", price: 15, quantity: 25, threshold: 10 },
  { productName: "Century Tuna", category: "Food & Snacks", price: 27, quantity: 15, threshold: 5 },
  { productName: "Coca-Cola 12oz", category: "Beverages", price: 18, quantity: 20, threshold: 8 },
  { productName: "Shampoo Sachet", category: "Cleaning Products", price: 6, quantity: 2, threshold: 5 },
  { productName: "Tide Powder", category: "Cleaning Products", price: 17, quantity: 6, threshold: 6 },
  { productName: "Sprite 1L", category: "Beverages", price: 36, quantity: 24, threshold: 10 },
];

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
