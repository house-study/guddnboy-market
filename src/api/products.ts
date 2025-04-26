import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        throw new Error('상품 목록이 존재하지 않습니다.');
      } else if (status === 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }

    throw new Error(
      '상품 목록을 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
  }
};

export const getProductDetail = async (id: number) => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new Error('상품 정보가 존재하지 않습니다.');
      } else if (status === 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }

    throw new Error(
      '상품 정보를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
  }
};
