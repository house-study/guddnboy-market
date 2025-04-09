{
  /* [TODO] json-server에서 데이터 가져오는 것으로 수정 */
}
const TEMP_ARRAY = Array(16).fill(null);

const Card = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <body>
        <div className="grid grid-cols-4 gap-8">
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
      </body>
    </div>
  );
};
export default Card;
