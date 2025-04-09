/* [TODO] json-server에서 데이터 가져오는 것으로 수정 */
const TEMP_ARRAY = Array(16).fill(null);

const ProductList = () => {
  return (
    <div className="p4 h-screen w-full max-w-7xl overflow-y-scroll">
      <div className="grid grid-cols-4 flex-col items-center justify-center gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {TEMP_ARRAY.map((_, index) => {
          return (
            <div
              key={index}
              className="flex transform flex-col rounded-lg p-4 shadow-sm transition-transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl"
            >
              <div className="h-60 w-60 bg-gray-200"></div>
              <div className="text-center text-lg">상품 이름</div>
              <div className="text-center text-sm text-gray-500">가격</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductList;
