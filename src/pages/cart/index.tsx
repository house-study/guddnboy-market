import { useEffect, useState } from 'react';

import CartProductList from '@/components/cart/CartProductList';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { getCart } from '@/utils/cart';

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const handleUpdateCart = () => {
    const data = getCart();
    setCart(data);
  };

  useEffect(() => {
    handleUpdateCart();
  }, []);

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartProductList cart={cart} onUpdateCart={handleUpdateCart} />
      )}
    </div>
  );
}
