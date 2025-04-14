import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product>({} as Product);

  const fetchProductDetail = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      const data = response.data;
      setProduct(data);
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    fetchProductDetail(Number(params.id));
  }, []);

  return (
    <div>
      <img src={product.imageURL} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}
