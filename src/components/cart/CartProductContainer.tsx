import CartProductPresenter from './CartProductPresenter';

interface CartProductContainerProps {
  product: CartProduct;
  isSelected: boolean;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onUpdateIsSelected: (id: string, isSelected: boolean) => void;
  onRemoveProduct: (id: string) => void;
}

export default function CartProductContainer({
  product,
  isSelected,
  onUpdateQuantity,
  onUpdateIsSelected,
  onRemoveProduct,
}: CartProductContainerProps) {
  const { id, quantity, amount } = product;

  const handleUpdateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1 || newQuantity > amount) {
      return;
    }
    onUpdateQuantity(id, newQuantity);
  };

  const handleAddQuantity = () => {
    handleUpdateQuantity(1);
  };

  const handleSubtractQuantity = () => {
    handleUpdateQuantity(-1);
  };

  const handleUpdateIsSelected = () => {
    onUpdateIsSelected(id, isSelected);
  };

  const handleRemoveProduct = () => {
    onRemoveProduct(id);
  };

  return (
    <CartProductPresenter
      product={product}
      isSelected={isSelected}
      onUpdateIsSelected={handleUpdateIsSelected}
      onAddQuantity={handleAddQuantity}
      onSubtractQuantity={handleSubtractQuantity}
      onRemoveProduct={handleRemoveProduct}
    />
  );
}
