import { Square, SquareCheck } from 'lucide-react';

export const CheckBox = ({
  index,
  checkList,
  handleCheck,
}: {
  index: number;
  checkList: boolean[];
  handleCheck: (index: number) => void;
}) => {
  return (
    <div className="flex justify-center">
      {checkList[index] ? (
        <button className="cursor-pointer" onClick={() => handleCheck(index)}>
          <SquareCheck size={30} />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => handleCheck(index)}>
          <Square size={30} />
        </button>
      )}
    </div>
  );
};
