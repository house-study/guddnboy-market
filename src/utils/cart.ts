import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from './localStorage';

export const getCart = (): CartProduct[] => {
  return getLocalStorage();
};

export const addToCart = (product: Product, quantity: number) => {
  const cart: CartProduct[] = getCart();
  const existingProduct = cart.find(
    (item: CartProduct) => item.id === product.id,
  );

  if (existingProduct) {
    existingProduct.quantity = quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  setLocalStorage(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter((item: CartProduct) => item.id !== productId);
  setLocalStorage(updatedCart);
};

export const updateCartData = (productId: string, quantity: number) => {
  const cart = getCart();
  const updatedCart = cart.map((item: CartProduct) => {
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
