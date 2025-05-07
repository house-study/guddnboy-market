import CartProduct from './CartProduct';

interface CartProductListProps {
  cartProductList: CartProduct[];
}

export default function CartProductList({
  cartProductList,
}: CartProductListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-0 overflow-y-auto">
      {cartProductList.map(product => (
        <CartProduct key={product.id} product={product} />
      ))}
    </div>
  );
}
