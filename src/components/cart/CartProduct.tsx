import { useEffect, useState } from 'react';

import {
  removeFromCart,
  updateProductIsNotSelected,
  updateProductIsSelected,
  updateProductQuantity,
} from '@/utils/cart';
import { formattedPrice } from '@/utils/price';

interface CartProductProps {
  product: CartProduct;
  onUpdateCart: () => void;
}

export default function CartProduct({
  product,
  onUpdateCart,
}: CartProductProps) {
  const { id, price, quantity, imageURL, name, amount, isSelected } = product;
  const [productTotalPrice, setProductTotalPrice] = useState(price * quantity);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [isProductSelected, setIsProductSelected] = useState(isSelected);

  const updateQuantity = (newQuantity: number) => {
    setProductQuantity(newQuantity);
    setProductTotalPrice(price * newQuantity);
    updateProductQuantity(id, newQuantity);
    onUpdateCart();
  };

  const updateIsSelected = () => {
    if (isProductSelected) {
      setIsProductSelected(false);
      updateProductIsNotSelected(id);
    } else {
      setIsProductSelected(true);
      updateProductIsSelected(id);
    }
    onUpdateCart();
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

  const removeProduct = () => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      removeFromCart(id);
      onUpdateCart();
    }
  };

  useEffect(() => {
    function updateProductData() {
      setProductQuantity(quantity);
      setProductTotalPrice(price * quantity);
      setIsProductSelected(isSelected);
    }
    updateProductData();
  }, [quantity, isSelected]);

  return (
    <div className="grid grid-cols-5 items-center gap-4 border-b border-gray-200 py-6">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          className="h-6 w-6 cursor-pointer rounded-sm border-2 border-gray-400"
          checked={isProductSelected}
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
        <button
          onClick={removeProduct}
          className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
