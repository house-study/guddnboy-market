import { useEffect, useMemo, useState } from 'react';

import CartProductList from '@/components/cart/CartProductList';
import { EmptyCart } from '@/components/cart/EmptyCart';
import {
  clearCart,
  getCart,
  removeFromCart,
  updateAllProductIsNotSelected,
  updateAllProductIsSelected,
  updateProductIsNotSelected,
  updateProductIsSelected,
  updateProductQuantity,
} from '@/utils/cart';

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const totalPrice = useMemo(() => {
    const selectedProducts = cart.filter(
      product => product.isSelected === true,
    );
    return selectedProducts.reduce(
      (prev, product) => prev + product.price * product.quantity,
      0,
    );
  }, [cart]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateProductQuantity(id, newQuantity);
    setCart(prevCart =>
      prevCart.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      ),
    );
  };

  const handleUpdateIsSelected = (id: string, isSelected: boolean) => {
    if (isSelected) {
      updateProductIsNotSelected(id);
    } else {
      updateProductIsSelected(id);
    }
    setCart(prevCart =>
      prevCart.map(product =>
        product.id === id ? { ...product, isSelected: !isSelected } : product,
      ),
    );
  };

  const removeSelectedProducts = () => {
    const selectedProducts = cart.filter(
      product => product.isSelected === true,
    );

    if (selectedProducts.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    const isConfirmed = confirm('정말 선택한 상품을 삭제하시겠습니까?');
    if (isConfirmed) {
      selectedProducts.forEach(product => removeFromCart(product.id));
      setCart(prevCart => prevCart.filter(product => !product.isSelected));
    }
  };

  const removeAllProducts = () => {
    const isConfirmed = confirm('정말 장바구니를 비우시겠습니까?');
    if (isConfirmed) {
      clearCart();
      setCart([]);
    }
  };

  const selectAllProducts = () => {
    if (isAllSelected) {
      updateAllProductIsNotSelected();
      setCart(prevCart =>
        prevCart.map(product => ({ ...product, isSelected: false })),
      );
    } else {
      updateAllProductIsSelected();
      setCart(prevCart =>
        prevCart.map(product => ({ ...product, isSelected: true })),
      );
    }
  };

  const handleRemoveProduct = (id: string) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      removeFromCart(id);
      setCart(prevCart => prevCart.filter(product => product.id !== id));
    }
  };

  const isAllSelected = cart.every(product => product.isSelected === true);

  useEffect(() => {
    const data = getCart();
    setCart(data);
  }, []);

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartProductList
          cart={cart}
          totalPrice={totalPrice}
          removeSelectedProducts={removeSelectedProducts}
          removeAllProducts={removeAllProducts}
          selectAllProducts={selectAllProducts}
          isAllSelected={isAllSelected}
          onUpdateQuantity={handleUpdateQuantity}
          onUpdateIsSelected={handleUpdateIsSelected}
          onRemoveProduct={handleRemoveProduct}
        />
      )}
    </div>
  );
}
