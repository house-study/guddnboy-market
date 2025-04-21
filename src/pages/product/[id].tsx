import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getProductDetail } from '@/api/products';
import ErrorComponent from '@/components/ErrorComponent';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product>({} as Product);
  const [isError, setIsError] = useState<Error | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const loadProductDetail = async (id: number) => {
      try {
        const productData = await getProductDetail(id);
        setProduct(productData);
        setTotalPrice(productData?.price || 0);
      } catch (error) {
        setIsError(error as Error);
      }
    };
    if (params?.id) {
      loadProductDetail(Number(params.id));
    }
  }, [params?.id]);
  if (isError) {
    return <ErrorComponent message={isError.message} />;
  }

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
          {product.price?.toLocaleString()}원
        </p>
        <div className="space-y-1 text-sm text-gray-500">
          <p>주말 / 공휴일을 제외한 1 - 2일 내 수령</p>
          <p>4만원 이상 구매시 배송비 무료</p>
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-500">
            현재 재고량 : {product.amount || 1}
          </p>
          <input
            type="number"
            min="1"
            max={product.amount || 1}
            defaultValue="1"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
            onChange={e => {
              const quantity = Number(e.target.value);
              setTotalPrice(quantity * (product.price || 0));
            }}
          />
          <div className="flex items-center justify-between text-lg font-bold text-gray-800">
            <span>총 상품 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
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
