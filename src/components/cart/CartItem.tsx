import { CheckBox } from './CheckBox';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    imageURL: string;
    quantity: number;
    price: number;
    amount: number;
  };
  index: number;
  checkList: boolean[];
  handleCheck: (index: number) => void;
  handleQuantityChange: (index: number, newQuantity: number) => void;
}

export const CartItem = ({
  item,
  index,
  checkList,
  handleCheck,
  handleQuantityChange,
}: CartItemProps) => {
  return (
    <div className="grid grid-cols-5 items-center border-t py-4 text-center">
      <CheckBox index={index} checkList={checkList} handleCheck={handleCheck} />
      <div className="flex items-center gap-4">
        <img
          src={item.imageURL}
          alt={item.name}
          className="h-16 w-16 object-cover"
        />
        <div className="text-left">
          <div className="font-semibold">{item.name}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="cursor-pointer rounded border bg-gray-200 px-2 text-gray-500"
          onClick={() => handleQuantityChange(index, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          className="cursor-pointer rounded border bg-gray-200 px-2 text-gray-500"
          onClick={() => handleQuantityChange(index, item.quantity + 1)}
          disabled={item.quantity >= item.amount}
        >
          +
        </button>
      </div>
      <div className="flex justify-center">
        {(item.price * item.quantity).toLocaleString()}원
      </div>
    </div>
  );
};
