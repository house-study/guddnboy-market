export const DeleteButton = ({
  handleSelectDelete,
  handleAllDelete,
}: {
  handleSelectDelete: () => void;
  handleAllDelete: () => void;
}) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer border px-4 py-2 text-gray-500 hover:text-black"
          onClick={handleSelectDelete}
        >
          선택 삭제
        </button>
        <button
          className="cursor-pointer border px-4 py-2 text-gray-500 hover:text-black"
          onClick={handleAllDelete}
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
};
