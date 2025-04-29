import { v4 } from 'uuid';

export const getCartItems = (): CartList[] => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

export const addToCart = (product: Product, quantity: number) => {
  const cartItems: CartList[] = getCartItems();
  const existingItem = cartItems.find(item => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newCartItem: CartList = {
      id: v4(),
      productId: product.id,
      quantity: quantity,
    };
    cartItems.push(newCartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  alert('상품이 장바구니에 추가되었습니다.');
};

export const removeCartItem = (id: string) => {
  const cartItems: CartList[] = getCartItems();
  const updatedCartItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  return updatedCartItems;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};
