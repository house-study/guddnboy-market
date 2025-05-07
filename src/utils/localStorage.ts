const CART_KEY = 'cart';

export const getLocalStorage = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const setLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
