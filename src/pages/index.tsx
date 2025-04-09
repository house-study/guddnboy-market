import Card from '@/components/Card';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <header>
        <div className="my-8">
          <h1 className="text-center text-4xl font-bold">시장에 가면</h1>
        </div>
      </header>

      <Card />
    </div>
  );
};

export default Home;
