import { useEffect, useState } from 'react';

import {
  updateProductIsNotSelected,
  updateProductIsSelected,
  updateProductQuantity,
} from '@/utils/cart';
import { formattedPrice } from '@/utils/price';

interface CartProductProps {
  product: CartProduct;
}

export default function CartProduct({ product }: CartProductProps) {
  const { id, price, quantity, imageURL, name, amount, isSelected } = product;
  const [productTotalPrice, setProductTotalPrice] = useState(price * quantity);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [isChecked, setIsChecked] = useState(isSelected);

  const updateQuantity = (newQuantity: number) => {
    setProductQuantity(newQuantity);
    setProductTotalPrice(price * newQuantity);
    updateProductQuantity(id, newQuantity);
  };

  const updateIsSelected = () => {
    setIsChecked(!isChecked);
  };

  const addQuantity = () => {
    const newQuantity = productQuantity + 1;
    if (newQuantity > amount) {
      return;
    }
    updateQuantity(newQuantity);
  };

  const subtractQuantity = () => {
    const newQuantity = productQuantity - 1;
    if (newQuantity < 1) {
      return;
    }
    updateQuantity(newQuantity);
  };

  useEffect(() => {
    function updateProductData() {
      setProductQuantity(quantity);
      setProductTotalPrice(price * quantity);
      setIsChecked(isSelected);
    }
    updateProductData();
  }, [quantity, isSelected]);

  useEffect(() => {
    if (isChecked) {
      updateProductIsNotSelected(id);
    } else {
      updateProductIsSelected(id);
    }
  }, [isChecked]);

  return (
    <div className="grid grid-cols-5 items-center gap-4 border-b border-gray-200 py-6">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          className="h-6 w-6 cursor-pointer rounded-sm border-2 border-gray-400"
          checked={isChecked}
          onChange={updateIsSelected}
        />
      </div>
      <div className="flex items-center">
        <div className="h-20 w-20 overflow-hidden rounded-md border border-gray-200 shadow-sm">
          <img
            src={imageURL}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-6 truncate">{name}</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center rounded-md border border-gray-300">
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={subtractQuantity}
          >
            –
          </button>
          <span className="mx-2 w-8 text-center">{productQuantity}</span>
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={addQuantity}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-center font-semibold text-gray-900">
        {formattedPrice(productTotalPrice)}원
      </div>
      <div className="flex items-center justify-center">
        <button className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
          삭제
        </button>
      </div>
    </div>
  );
}
