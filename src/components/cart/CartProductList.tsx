import { useEffect, useMemo, useState } from 'react';

import {
  clearCart,
  getCart,
  removeFromCart,
  updateAllProductIsNotSelected,
  updateAllProductIsSelected,
} from '@/utils/cart';
import { formattedPrice } from '@/utils/price';

import CartProduct from './CartProduct';

const SELECTED = true;

export default function CartProductList() {
  const [cart, setCart] = useState<CartProduct[]>(getCart());

  const totalPrice = useMemo(() => {
    const selectedProducts = cart.filter(
      product => product.isSelected === SELECTED,
    );
    return selectedProducts.reduce(
      (prev, product) => prev + product.price * product.quantity,
      0,
    );
  }, [cart.map(product => (product.isSelected ? product.quantity : 0))]);

  const formattedTotalPrice = formattedPrice(totalPrice);

  const handleUpdateCart = () => {
    const updatedCart = getCart();
    setCart(updatedCart);
  };

  const selectAllProducts = () => {
    const isAllSelected = cart.every(
      product => product.isSelected === SELECTED,
    );
    if (isAllSelected) {
      updateAllProductIsNotSelected();
    } else {
      updateAllProductIsSelected();
    }
    setCart(getCart());
  };

  const removeSelectedProducts = () => {
    const selectedProducts = cart.filter(
      product => product.isSelected === SELECTED,
    );
    selectedProducts.forEach(product => removeFromCart(product.id));
    handleUpdateCart();
  };

  const removeAllProducts = () => {
    const isConfirmed = confirm('정말 장바구니를 비우시겠습니까?');
    if (isConfirmed) {
      clearCart();
      handleUpdateCart();
    }
  };

  useEffect(() => {
    handleUpdateCart();
  }, []);

  return (
    <>
      <div className="w-full border-b py-2 text-center text-sm font-semibold">
        <div className="grid grid-cols-5 items-center gap-4">
          <div>
            <input
              type="checkbox"
              title="전체 선택"
              className="h-6 w-6 cursor-pointer rounded-sm border-2 border-gray-400"
              onClick={selectAllProducts}
            />
          </div>
          <div>상품 정보</div>
          <div>수량</div>
          <div>주문금액</div>
          <div>삭제</div>
        </div>
      </div>
      <div className="w-full overflow-y-auto border-y-2 border-gray-200">
        {cart.map(product => (
          <CartProduct
            key={product.id}
            product={product}
            onUpdateCart={handleUpdateCart}
          />
        ))}
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-4 border-t pt-4">
        <div className="col-span-2 flex items-center gap-2">
          <button
            title="선택 삭제"
            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            onClick={removeSelectedProducts}
          >
            선택 삭제
          </button>
          <button
            title="전체 삭제"
            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            onClick={removeAllProducts}
          >
            장바구니 비우기
          </button>
        </div>
        <div className="col-span-2 flex items-center justify-end gap-4 text-right">
          <span className="font-semibold">합계:</span>
          <span className="inline-block min-w-24 pr-4 text-lg font-semibold">
            {formattedTotalPrice} 원
          </span>
        </div>
        <div className="flex justify-end">
          <button
            title="결제하기"
            className="cursor-pointer rounded-md bg-lime-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-lime-600"
          >
            결제하기
          </button>
        </div>
      </div>
    </>
  );
}
