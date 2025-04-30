export const Header = () => {
  return (
    <div className="grid grid-cols-3 border-b py-2 text-center text-sm font-semibold sm:grid-cols-4 md:grid-cols-5">
      <div>선택</div>
      <div>상품 정보</div>
      <div>수량</div>
      <div>주문금액</div>
      <div className="hidden md:block">삭제</div>
    </div>
  );
};
