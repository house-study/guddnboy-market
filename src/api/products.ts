import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};
