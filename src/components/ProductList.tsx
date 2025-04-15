import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      const data = response.data;
      setProducts(data);
      return;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-screen w-full max-w-7xl overflow-y-scroll p-4">
      <div className="grid grid-cols-4 flex-col items-center justify-center gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {products?.map(product => (
          <div
            key={`${product.name}-${product.id}`}
            className="flex transform flex-col rounded-lg p-4 shadow-sm transition-transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl"
          >
            <img
              className="h-60 w-60 bg-gray-200"
              src={product.imageURL}
              alt={product.name}
            />
            <div className="text-center text-lg">{product.name}</div>
            <div className="text-center text-sm text-gray-500">
              {product.price.toLocaleString('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductList;
