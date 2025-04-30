import { useRouter } from 'next/router';
export const EmptyCart = () => {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push('/');
  };
  return (
    <div className="mx-auto max-w-screen-lg items-center py-8 text-center text-gray-400">
      <p>원하는 상품을 장바구니에 담아보세요.</p>

      <button
        onClick={handleGoToHome}
        className="mt-6 rounded bg-gray-700 px-6 py-2 text-white transition-colors hover:bg-gray-800"
      >
        상품 보러가기
      </button>
    </div>
  );
};
