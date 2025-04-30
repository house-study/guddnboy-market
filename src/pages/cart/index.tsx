import { useState, useEffect } from 'react';

import { getProductDetail } from '@/api/products';
import { CartItem } from '@/components/cart/CartItem';
import { DeleteButton } from '@/components/cart/DeleteButton';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Header } from '@/components/cart/Header';
import { PaymentButton } from '@/components/cart/PaymentButton';
import { CartLoading } from '@/components/loading/CartLoading';
import {
  clearCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
} from '@/utils/cart';

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsInCart, setProductsInCart] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [checkList, setCheckList] = useState<boolean[]>([]);

  const handleCheck = (index: number) => {
    const updatedCheckList = [...checkList];
    updatedCheckList[index] = !updatedCheckList[index];
    setCheckList(updatedCheckList);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...productsInCart];
    updatedProducts[index].quantity = newQuantity;
    setProductsInCart(updatedProducts);
    updateCartItem(updatedProducts[index].id, newQuantity);
  };

  const handleSelectDelete = () => {
    const updatedProducts = productsInCart.filter(
      (_, index) => !checkList[index],
    );

    updatedProducts.forEach(item => deleteCartItem(item.id));

    setProductsInCart(updatedProducts);
    setCheckList(new Array(updatedProducts.length).fill(false));
    alert('상품이 장바구니에서 삭제되었습니다.');
  };
  const handleAllDelete = () => {
    if (confirm('정말로 장바구니를 모두 삭제하시겠습니까?')) {
      setProductsInCart([]);
      setCheckList([]);
      clearCart();
      alert('장바구니가 비워졌습니다.');
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const items = getCartItems();

      const productsData = await Promise.all(
        items.map(async item => {
          const numbericId = Number(item.productId);
          const product = await getProductDetail(numbericId);
          return {
            ...product,
            quantity: item.quantity,
          };
        }),
      );

      const products = await Promise.all(productsData);

      setCheckList(new Array(products.length).fill(false));
      setProductsInCart(products);
      setIsLoading(false);
    };

    fetchCartData();
  }, []);

  if (isLoading) {
    return <CartLoading />;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">장바구니</h1>
      <div className="border-t border-b py-4">
        <div className="flex min-h-24 flex-col justify-center">
          {productsInCart.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <Header />
              {productsInCart.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  checkList={checkList}
                  handleCheck={handleCheck}
                  handleQuantityChange={handleQuantityChange}
                  handleDelete={handleSelectDelete}
                />
              ))}
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <DeleteButton
                    title="선택 삭제"
                    handleDelete={handleSelectDelete}
                  />
                  <DeleteButton
                    title="전체 삭제"
                    handleDelete={handleAllDelete}
                  />
                </div>
                <PaymentButton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
