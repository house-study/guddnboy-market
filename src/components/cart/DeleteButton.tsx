export const DeleteButton = ({
  title,
  handleDelete,
}: {
  title: string;
  handleDelete: () => void;
}) => {
  return (
    <button
      className="cursor-pointer border px-4 py-2 text-gray-500 hover:text-black"
      onClick={handleDelete}
    >
      {title}
    </button>
  );
};
