export const CartLoading = () => {
  return (
    <div className="flex h-64 flex-col items-center justify-center text-gray-500">
      <svg
        className="mb-4 h-8 w-8 animate-spin text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="text-sm">장바구니 정보를 불러오는 중입니다...</p>
    </div>
  );
};
