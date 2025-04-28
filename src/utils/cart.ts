export const getCartItems = (): CartItem[] => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

export const addToCart = (product: Product, quantity: number) => {
  const cartItems: CartItem[] = getCartItems();
  const existingItem = cartItems.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newCartItem: CartItem = {
      ...product,
      quantity: quantity,
      isChecked: false,
    };
    cartItems.push(newCartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  alert('상품이 장바구니에 추가되었습니다.');
};

export const checkCartItem = (id: string) => {
  const cartItems: CartItem[] = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    cartItems[itemIndex].isChecked = !cartItems[itemIndex].isChecked;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
};

export const removeCheckedItems = () => {
  const cartItems: CartItem[] = getCartItems();
  const updatedCartItems = cartItems.filter(item => !item.isChecked);

  if (updatedCartItems.length === cartItems.length) {
    alert('삭제할 상품을 선택해주세요.');
  } else {
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    alert('선택한 상품이 삭제되었습니다.');
  }
};

export const removeCartItem = (id: string) => {
  const cartItems: CartItem[] = getCartItems();
  const updatedCartItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  alert('상품이 장바구니에서 삭제되었습니다.');
};

export const increaseCartItemQuantity = (id: string) => {
  const cartItems: CartItem[] = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === id);

  if (
    itemIndex !== -1 &&
    cartItems[itemIndex].quantity < cartItems[itemIndex].amount
  ) {
    cartItems[itemIndex].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
};

export const decreaseCartItemQuantity = (id: string) => {
  const cartItems: CartItem[] = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === id);

  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
};
