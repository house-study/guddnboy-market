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
};

export const updateCartItem = (id: string, quantity: number) => {
  const cartItems: CartList[] = getCartItems();
  const updatedItems = cartItems.map(item => {
    if (item.productId === id) {
      return { ...item, quantity: quantity };
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(updatedItems));
};

export const deleteCartItem = (id: string) => {
  const cartItems: CartList[] = getCartItems();
  const updatedCartItems = cartItems.filter(item => item.productId !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};
