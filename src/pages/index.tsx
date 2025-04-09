import Header from '@/components/Header';
import ProductList from '@/components/ProductList';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <ProductList />
    </div>
  );
};

export default Home;
