import { useState, useEffect } from 'react';

import { getProductDetail } from '@/api/products';
import { Button } from '@/components/cart/Button';
import { CartItem } from '@/components/cart/CartItem';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Header } from '@/components/cart/Header';
import { PaymentButton } from '@/components/cart/PaymentButton';
import { CartLoading } from '@/components/loading/CartLoading';
import { getCartItems, deleteCartItem, updateCartItem } from '@/utils/cart';
import { formattedPrice, calculateTotalPrice } from '@/utils/price';

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsInCart, setProductsInCart] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [checkList, setCheckList] = useState<boolean[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleDeleteCheckedItems = () => {
    const updatedProducts = productsInCart.filter(
      (_, index) => checkList[index],
    );

    if (updatedProducts.length === 0) {
      alert('삭제할 상품을 선택해주세요.');
      return;
    }

    updatedProducts.forEach(item => deleteCartItem(item.id));

    setProductsInCart(updatedProducts);
    setCheckList(new Array(updatedProducts.length).fill(false));
    alert('상품이 장바구니에서 삭제되었습니다.');
  };

  const handleDeleteItem = (productId: string) => {
    const updatedProducts = productsInCart.filter(
      item => item.id !== productId,
    );
    setProductsInCart(updatedProducts);
    deleteCartItem(productId);
    alert('상품이 장바구니에서 삭제되었습니다.');
  };

  const handleSelectAll = () => {
    const allChecked = checkList.map(item => !item);
    setCheckList(allChecked);
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
  }, [productsInCart.length]);

  useEffect(() => {
    const totalPrice = productsInCart.reduce((acc, item, index) => {
      if (checkList[index]) {
        return acc + calculateTotalPrice(item.quantity, item.price);
      }
      return acc;
    }, 0);
    setTotalPrice(totalPrice);
  }, [checkList, productsInCart]);

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
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
              <div className="grid gap-4 border-t pt-4 md:grid-cols-3 md:items-center">
                <div className="flex items-center gap-2">
                  <Button title="전체 선택" handleFunction={handleSelectAll} />
                  <Button
                    title="선택 삭제"
                    handleFunction={handleDeleteCheckedItems}
                  />
                </div>
                <div className="flex w-full items-center justify-end gap-4 text-right md:w-auto md:justify-end">
                  <span className="font-semibold">합계:</span>
                  <span className="inline-block min-w-24 pr-4 text-lg font-semibold">
                    {formattedPrice(totalPrice)} 원
                  </span>
                </div>
                <div className="mr-4 flex justify-end">
                  <PaymentButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
