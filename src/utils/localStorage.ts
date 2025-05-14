export const getLocalStorage = (keyName: string) => {
  const cart = localStorage.getItem(keyName);
  return cart ? JSON.parse(cart) : [];
};

export const setLocalStorage = (keyName: string, cart: CartProduct[]) => {
  localStorage.setItem(keyName, JSON.stringify(cart));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
