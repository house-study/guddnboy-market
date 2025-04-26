interface Product {
  id: string;
  imageURL: string;
  name: string;
  origin: string;
  description: string;
  price: number;
  amount: number;
}

interface CartItem extends Product {
  quantity: number;
  isChecked: boolean;
}
