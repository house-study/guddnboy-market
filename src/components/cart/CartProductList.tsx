import { formattedPrice } from '@/utils/price';

import CartProduct from './CartProduct';

interface CartProductListProps {
  cartProductList: CartProduct[];
}

export default function CartProductList({
  cartProductList,
}: CartProductListProps) {
  const totalPrice = cartProductList.reduce(
    (prev, product) => prev + product.price * product.quantity,
    0,
  );

  const formattedTotalPrice = formattedPrice(totalPrice);
  return (
    <>
      <div className="grid w-full grid-cols-5 border-b py-2 text-center text-sm font-semibold">
        <div>선택</div>
        <div>상품 정보</div>
        <div>수량</div>
        <div>주문금액</div>
        <div>삭제</div>
      </div>
      <div className="w-full overflow-y-auto border-y-2 border-gray-200">
        {cartProductList.map(product => (
          <CartProduct key={product.id} product={product} />
        ))}
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-4 border-t pt-4">
        <div className="col-span-2 flex items-center gap-2">
          <button
            title="전체 선택"
            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
          >
            전체 선택
          </button>
          <button
            title="선택 삭제"
            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
          >
            선택 삭제
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
