import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from './localStorage';

const CART_KEY = 'cart';

export const getCart = (): CartProduct[] => {
  return getLocalStorage(CART_KEY);
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

  setLocalStorage(CART_KEY, cart);
};

export const removeFromCart = (productId: string) => {
  const cart: CartProduct[] = getCart();
  const updatedCart = cart.filter((item: CartProduct) => item.id !== productId);
  setLocalStorage(CART_KEY, updatedCart);
};

export const updateProductQuantity = (productId: string, quantity: number) => {
  const cart: CartProduct[] = getCart();
  const updatedCart = cart.map((item: CartProduct) => {
    if (item.id === productId) {
      item.quantity = quantity;
    }
    return item;
  });
  setLocalStorage(CART_KEY, updatedCart);
};

export const clearCart = () => {
  clearLocalStorage();
};
