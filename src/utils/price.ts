import { ChangeEvent } from 'react';

export const formattedPrice = (price: number): string => {
  const formattedPrice = price?.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
  return formattedPrice?.replace('₩', '').trim() || '0';
};

export const calculateTotalPrice = (
  e: ChangeEvent<HTMLInputElement>,
  price: number,
): number => {
  const totalPrice = Number(e.target.value) * (price || 0);
  return totalPrice;
};
