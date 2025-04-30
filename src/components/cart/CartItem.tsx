import { Trash2 } from 'lucide-react';

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
  handleDelete: (id: string) => void;
}

export const CartItem = ({
  item,
  index,
  checkList,
  handleCheck,
  handleQuantityChange,
  handleDelete,
}: CartItemProps) => {
  return (
    <div className="grid grid-cols-3 items-center border-t py-4 text-center text-sm sm:grid-cols-4 md:grid-cols-5">
      <CheckBox index={index} checkList={checkList} handleCheck={handleCheck} />
      <div className="flex items-center justify-start gap-3">
        <img
          src={item.imageURL}
          alt={item.name}
          className="h-16 w-16 object-cover"
        />
        <div className="text-left">
          <div className="font-semibold">{item.name}</div>
        </div>
      </div>
      <div className="text-center">
        <span className="block sm:hidden">{item.quantity}</span>
        <div className="hidden items-center justify-center sm:flex">
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
      </div>
      <div className="text-center">
        {(item.price * item.quantity).toLocaleString()}원
      </div>
      <div className="hidden cursor-pointer justify-center md:flex">
        <button
          className="text-gray-400 hover:text-red-500"
          onClick={() => handleDelete(item.id)}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};
