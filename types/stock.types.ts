export interface StockResponse {
  variantId: string;
  inStock: boolean;
  trackQuantity: boolean;
  quantity: number | null;
}
