export const formattedPrice = (price: number): string => {
  const formattedPrice = price?.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
  return formattedPrice?.replace('₩', '').trim() || '0';
};

export const calculateTotalPrice = (
  quantity: number,
  price: number,
): number => {
  const totalPrice = quantity * (price || 0);
  return totalPrice;
};
