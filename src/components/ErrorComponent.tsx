type ErrorComponentProps = {
  message: string;
};

const ErrorComponent = ({ message }: ErrorComponentProps) => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center rounded bg-red-100 p-4 text-red-800">
      <strong className="mb-2">에러 발생:</strong>
      <span className="mb-4">{message}</span>
      <button
        onClick={reloadPage}
        className="rounded bg-blue-400 px-3 py-1 text-white hover:bg-blue-500"
      >
        새로 고침하기
      </button>
    </div>
  );
};

export default ErrorComponent;
