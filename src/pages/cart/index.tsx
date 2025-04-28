import { Trash2, Square, SquareCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

import {
  getCartItems,
  checkCartItem,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCheckedItems,
} from '@/utils/cart';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">장바구니</h1>
      <div className="border-t border-b py-4">
        <div className="grid grid-cols-5 py-2 text-center text-sm font-semibold">
          <div>선택</div>
          <div>상품 정보</div>
          <div>수량</div>
          <div>주문금액</div>
        </div>
        <div className="flex min-h-24 flex-col justify-center">
          {cartItems.length === 0 ? (
            <div className="grid grid-cols-5 items-center border-t py-8 text-center text-gray-400">
              <div className="col-span-5">장바구니에 담긴 상품이 없습니다.</div>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center border-t py-4 text-center"
              >
                <div className="flex justify-center">
                  {item.isChecked ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        checkCartItem(item.id);
                        setCartItems(getCartItems());
                      }}
                    >
                      <SquareCheck size={30} />
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        checkCartItem(item.id);
                        setCartItems(getCartItems());
                      }}
                    >
                      <Square size={30} />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="h-16 w-16 object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{item.name}</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer rounded border bg-gray-200 px-2 text-gray-500"
                    onClick={() => {
                      decreaseCartItemQuantity(item.id);
                      setCartItems(getCartItems());
                    }}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="cursor-pointer rounded border bg-gray-200 px-2 text-gray-500"
                    onClick={() => {
                      increaseCartItemQuantity(item.id);
                      setCartItems(getCartItems());
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-center">
                  {(item.price * item.quantity).toLocaleString()}원
                </div>
                <div className="flex justify-center">
                  <button
                    className="flex cursor-pointer justify-center text-gray-400 hover:text-red-500"
                    onClick={() => {
                      removeCartItem(item.id);
                      setCartItems(getCartItems());
                    }}
                  >
                    <Trash2 size={30} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          className="cursor-pointer border px-4 py-2 text-gray-500 hover:text-black"
          onClick={() => {
            removeCheckedItems();
            setCartItems(getCartItems());
          }}
        >
          선택상품 삭제
        </button>
        <button
          className="cursor-pointer rounded bg-gray-300 px-8 py-3 text-white hover:bg-gray-400"
          disabled={cartItems.length === 0}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
