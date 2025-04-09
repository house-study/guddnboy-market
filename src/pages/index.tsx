import Card from '@/components/Card';
import Header from '@/components/Header';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="h-screen overflow-y-scroll">
        <Card />
      </div>
    </div>
  );
};

export default Home;
