interface Product {
  id: string;
  imageURL: string;
  name: string;
  origin: string;
  description: string;
  price: number;
  amount: number;
}

interface CartItem {
  id: string;
  imageURL: string;
  name: string;
  origin: string;
  price: number;
  amount: number;
  quantity: number;
}
