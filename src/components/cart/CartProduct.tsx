import { formattedPrice } from '@/utils/price';

interface CartProductProps {
  product: CartProduct;
}

export default function CartProduct({ product }: CartProductProps) {
  const { price, quantity, imageURL, name } = product;
  const productPrice = formattedPrice(price);

  return (
    <div className="grid grid-cols-5 items-center gap-4 px-4 py-4">
      <input
        type="checkbox"
        className="h-6 w-6 rounded-sm border-2 border-gray-400"
      />
      <div className="flex items-center">
        <div className="h-24 w-24 bg-gray-100">
          <img
            src={imageURL}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="ml-6 text-base font-medium">{name}</span>
      </div>
      <div className="flex items-center justify-center">
        <button className="h-8 w-8 rounded-sm border border-gray-400">–</button>
        <span className="mx-2">{quantity}</span>
        <button className="h-8 w-8 rounded-sm border border-gray-400">+</button>
      </div>
      <span className="text-center font-semibold">{productPrice}원</span>
      <button className="h-8 w-8 rounded-sm border border-gray-300 text-sm hover:bg-gray-100">
        삭제
      </button>
    </div>
  );
}
