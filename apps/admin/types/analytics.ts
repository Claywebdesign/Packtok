export interface ProductStats {
  totalProducts: number;
  newProductsToday: number;
  totalSales: number;
  newSalesToday: number;
}

export interface TopSellingProduct {
  id: string;
  name: string;
  price: number;
  totalOrders: number;
  totalSales: number;
  category?: string;
}

export interface MonthlyProductData {
  month: string;
  value: number;
}

export interface SalesAnalytics {
  totalSales: number;
  totalOrders: number;
  ordersCanceled: number;
}
