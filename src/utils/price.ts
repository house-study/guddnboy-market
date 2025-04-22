import { ChangeEvent } from 'react';

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

export const calculateTotalPrice = (
  e: ChangeEvent<HTMLInputElement>,
  price: number,
): number => {
  const totalPrice = Number(e.target.value) * price;
  return totalPrice;
};
