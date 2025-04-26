import { GetServerSidePropsContext } from 'next';
import { ChangeEvent, useState } from 'react';

import { getProductDetail } from '@/api/products';
import ErrorComponent from '@/components/ErrorComponent';
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
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return {
        props: {
          error: {
            message: error.message,
          },
        },
      };
    }
    return {
      props: {
        error: {
          message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
      },
    };
  }
}

export default function ProductDetail({
  product,
  error,
}: {
  product?: Product;
  error?: { message: string };
}) {
  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ErrorComponent message={error?.message || '상품 정보가 없습니다.'} />
      </div>
    );
  }

  const [totalPrice, setTotalPrice] = useState<number>(product.price);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    const newTotalPrice = calculateTotalPrice(quantity, product.price);
    setTotalPrice(newTotalPrice);
  };

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
        <p className="text-gray-500">{product.description}</p>
        <p className="text-xl font-semibold text-gray-900">
          {formattedPrice(product.price)}원
        </p>
        <div className="mt-4 space-y-3">
          <input
            type="number"
            min="1"
            max={product.amount}
            defaultValue="1"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
            onChange={handlePriceChange}
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
          <button className="flex-1 border border-black py-3 text-sm font-semibold hover:cursor-pointer hover:bg-gray-200">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
