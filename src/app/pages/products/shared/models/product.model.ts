export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
}
