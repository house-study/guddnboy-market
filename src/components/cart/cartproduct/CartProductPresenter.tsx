import { formattedPrice } from '@/utils/price';

interface CartProductPresenterProps {
  product: CartProduct;
  onUpdateIsSelected: () => void;
  onAddQuantity: () => void;
  onSubtractQuantity: () => void;
  onRemoveProduct: () => void;
}

export default function CartProductPresenter({
  product,
  onUpdateIsSelected,
  onAddQuantity,
  onSubtractQuantity,
  onRemoveProduct,
}: CartProductPresenterProps) {
  const { price, quantity, imageURL, name, isSelected } = product;
  const productPrice = formattedPrice(price);
  const totalPrice = formattedPrice(price * quantity);

  return (
    <div className="grid grid-cols-5 items-center gap-4 border-b border-gray-200 py-6">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          className="h-6 w-6 cursor-pointer rounded-sm border-2 border-gray-400"
          checked={isSelected}
          onChange={onUpdateIsSelected}
        />
      </div>
      <div className="flex items-center">
        <div className="h-20 w-20 overflow-hidden rounded-md border border-gray-200 shadow-sm">
          <img
            src={imageURL}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-6 flex flex-col truncate">
          <div className="text-md font-medium text-gray-800">{name}</div>
          <div className="text-sm font-semibold text-gray-600">
            {productPrice}원
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center rounded-md border border-gray-300">
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={onSubtractQuantity}
          >
            –
          </button>
          <span className="mx-2 w-8 text-center">{quantity}</span>
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={onAddQuantity}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-center font-semibold text-gray-900">
        {totalPrice}원
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={onRemoveProduct}
          className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
