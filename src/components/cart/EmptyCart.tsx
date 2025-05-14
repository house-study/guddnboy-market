import { useRouter } from 'next/router';

export const EmptyCart = () => {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">장바구니가 비어있습니다</h2>
      <p className="mb-8">원하는 상품을 장바구니에 담아보세요.</p>
      <button
        onClick={handleGoToHome}
        className="mt-6 cursor-pointer rounded bg-gray-700 px-6 py-2 text-white transition-colors hover:bg-gray-800"
      >
        상품 보러가기
      </button>
    </>
  );
};
