import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from './localStorage';

export const getCart = (): CartItem[] => {
  return getLocalStorage();
};

export const addToCart = (product: Product, quantity: number) => {
  const cart: CartItem[] = getCart();
  const existingProduct = cart.find((item: CartItem) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity = quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  setLocalStorage(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter((item: CartItem) => item.id !== productId);
  setLocalStorage(updatedCart);
};

export const updateCartData = (productId: string, quantity: number) => {
  const cart = getCart();
  const updatedCart = cart.map((item: CartItem) => {
    if (item.id === productId) {
      item.quantity = quantity;
    }
    return item;
  });
  setLocalStorage(updatedCart);
};

export const clearCart = () => {
  clearLocalStorage();
};
