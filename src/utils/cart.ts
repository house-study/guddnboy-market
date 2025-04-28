export const addToCart = (product: Product, quantity: number) => {
  const cartData = localStorage.getItem('cart');
  const cartItems: CartItem[] = cartData ? JSON.parse(cartData) : [];
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
