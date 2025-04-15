import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
