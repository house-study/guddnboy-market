import { GetServerSidePropsContext } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';

import { getProductDetail } from '@/api/products';
import ErrorComponent from '@/components/ErrorComponent';
import { addToCart } from '@/utils/cart';
import { formattedPrice, calculateTotalPrice } from '@/utils/price';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const numbericId = Number(id);
  try {
    const product = await getProductDetail(numbericId);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          message: '상품을 불러오는 데 실패했습니다.',
        },
      },
    };
  }
}

export default function ProductDetail({
  product,
  error,
}: {
  product: Product;
  error: { message: string };
}) {
  const [totalPrice, setTotalPrice] = useState<number>(product.price || 0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('상품이 장바구니에 추가되었습니다.');
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handlePriceChange = () => {
    const newTotalPrice = calculateTotalPrice(quantity, product.price);
    setTotalPrice(newTotalPrice);
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  useEffect(() => {
    handlePriceChange();
  }, [quantity]);

  return (
    <div className="flex flex-col gap-12 p-10 md:flex-row md:items-center md:justify-center">
      <div className="flex flex-1 items-center justify-center">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-96 object-cover shadow-md"
        />
      </div>
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <h2 className="text-lg text-gray-600">
          원산지: <span className="text-gray-900">{product.origin}</span>
        </h2>
        <p className="text-gray-500">{product.description}</p>
        <p className="text-xl font-semibold text-gray-900">
          {formattedPrice(product.price)}원
        </p>
        <div className="mt-4 space-y-3">
          <input
            type="number"
            min="1"
            max={product.amount || 1}
            value={quantity}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
            onChange={handleQuantityChange}
          />
          <div className="flex items-center justify-between text-lg font-bold text-gray-800">
            <span>총 상품 금액</span>
            <span>{formattedPrice(totalPrice)}원</span>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button className="flex-1 bg-black py-3 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-800">
            BUY
          </button>
          <button
            className="flex-1 border border-black py-3 text-sm font-semibold hover:cursor-pointer hover:bg-gray-200"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
