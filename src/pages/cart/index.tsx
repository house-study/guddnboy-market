import { useEffect, useMemo, useState } from 'react';

import CartProductList from '@/components/cart/CartProductList';
import { EmptyCart } from '@/components/cart/EmptyCart';
import {
  clearCart,
  getCart,
  removeFromCart,
  updateProductQuantity,
} from '@/utils/cart';

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<CartProduct[]>([]);

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (prev, product) => prev + product.price * product.quantity,
      0,
    );
  }, [selectedProducts]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateProductQuantity(id, newQuantity);
    setCart(prevCart =>
      prevCart.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      ),
    );
    if (selectedProducts.some(product => product.id === id)) {
      setSelectedProducts(prevSelected =>
        prevSelected.map(product =>
          product.id === id ? { ...product, quantity: newQuantity } : product,
        ),
      );
    }
  };

  const handleUpdateIsSelected = (id: string, isSelected: boolean) => {
    const productToSelect = cart.find(product => product.id === id);
    if (!productToSelect) return;

    setSelectedProducts(prevSelected => {
      if (isSelected) {
        return prevSelected.filter(product => product.id !== id);
      }
      return [...prevSelected, productToSelect];
    });
  };

  const removeSelectedProducts = () => {
    if (selectedProducts.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    const isConfirmed = confirm('정말 선택한 상품을 삭제하시겠습니까?');
    if (isConfirmed) {
      const selectedIds = selectedProducts.map(product => product.id);
      selectedIds.forEach(id => removeFromCart(id));

      setCart(prevCart =>
        prevCart.filter(product => !selectedIds.includes(product.id)),
      );
      setSelectedProducts([]);
    }
  };

  const removeAllProducts = () => {
    const isConfirmed = confirm('정말 장바구니를 비우시겠습니까?');
    if (isConfirmed) {
      clearCart();
      setCart([]);
      setSelectedProducts([]);
    }
  };

  const selectAllProducts = () => {
    setSelectedProducts(isAllSelected ? [] : [...cart]);
  };

  const handleRemoveProduct = (id: string) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      removeFromCart(id);
      setCart(prevCart => prevCart.filter(product => product.id !== id));
      setSelectedProducts(prevSelected =>
        prevSelected.filter(product => product.id !== id),
      );
    }
  };

  const isAllSelected = useMemo(() => {
    return (
      cart.length > 0 &&
      cart.every(product =>
        selectedProducts.some(selected => selected.id === product.id),
      )
    );
  }, [cart, selectedProducts]);

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
          isAllSelected={isAllSelected}
          selectedProducts={selectedProducts}
          removeSelectedProducts={removeSelectedProducts}
          removeAllProducts={removeAllProducts}
          selectAllProducts={selectAllProducts}
          onUpdateQuantity={handleUpdateQuantity}
          onUpdateIsSelected={handleUpdateIsSelected}
          onRemoveProduct={handleRemoveProduct}
        />
      )}
    </div>
  );
}
