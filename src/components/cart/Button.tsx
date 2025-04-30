export const Button = ({
  title,
  handleFunction,
}: {
  title: string;
  handleFunction: () => void;
}) => {
  return (
    <button
      className="cursor-pointer border px-4 py-2 text-gray-500 hover:text-black"
      onClick={handleFunction}
    >
      {title}
    </button>
  );
};
