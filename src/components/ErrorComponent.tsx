type ErrorComponentProps = {
  message: string;
};

const ErrorComponent = ({ message }: ErrorComponentProps) => {
  const reloadPage = () => {
    window.location.reload();
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <strong className="mb-2 text-lg text-gray-800">문제가 발생했어요!</strong>
      <span className="mb-4 text-sm text-gray-600">{message}</span>
      <div className="flex gap-4">
        <button
          onClick={reloadPage}
          className="trainsition rounded-md bg-lime-400 px-6 py-3 text-white duration-200 hover:bg-lime-500"
        >
          새로고침
        </button>
        <button
          onClick={navigateToHome}
          className="trainsition rounded-md bg-gray-300 px-6 py-3 text-gray-800 hover:bg-gray-400"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
