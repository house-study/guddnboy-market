export const formattedPrice = (price: number): string => {
  if (price) {
    const formattedPrice = price.toLocaleString('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    });
    return formattedPrice.replace('₩', '').trim();
  }
  return '0';
};
