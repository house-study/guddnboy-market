import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getProducts } from '@/api/products';
import ErrorComponent from '@/components/ErrorComponent';
import { formattedPrice } from '@/utils/price';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        setIsError(error as Error);
      }
    };

    loadProducts();
  }, []);

  if (isError) {
    return <ErrorComponent message={isError.message} />;
  }

  return (
    <div className="h-screen w-full max-w-7xl overflow-y-scroll p-4">
      <div className="grid grid-cols-4 flex-col items-center justify-center gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {products?.map(product => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="flex transform cursor-pointer flex-col rounded-lg p-4 shadow-sm transition-transform hover:scale-105 hover:shadow-2xl">
              <img
                className="h-60 w-60 bg-gray-200"
                src={product.imageURL}
                alt={product.name}
              />
              <div className="text-center text-lg">{product.name}</div>
              <div className="text-center text-sm text-gray-500">
                {formattedPrice(product.price)}원
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Products;
