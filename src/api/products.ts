import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

export const getProductDetail = async (id: number) => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('상품 상세 정보를 불러오는 데 실패했습니다.');
  }
};

export const getCartProducts = async () => {
  try {
    const response = await axios.get<CartItem[]>(`${API_URL}/cart`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('장바구니 정보를 불러오는 데 실패했습니다.');
  }
};

export const addToCart = async (product: Product, quantity: number) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, {
      ...product,
      quantity,
    });
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('장바구니에 상품을 추가하는 데 실패했습니다.');
  }
};
