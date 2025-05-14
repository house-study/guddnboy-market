import CartProductPresenter from './CartProductPresenter';

interface CartProductContainerProps {
  product: CartProduct;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onUpdateIsSelected: (id: string, isSelected: boolean) => void;
  onRemoveProduct: (id: string) => void;
}

export default function CartProductContainer({
  product,
  onUpdateQuantity,
  onUpdateIsSelected,
  onRemoveProduct,
}: CartProductContainerProps) {
  const { id, quantity, amount, isSelected } = product;

  const updateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1 || newQuantity > amount) {
      return;
    }
    onUpdateQuantity(id, newQuantity);
  };

  const addQuantity = () => {
    updateQuantity(1);
  };

  const subtractQuantity = () => {
    updateQuantity(-1);
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
      onUpdateIsSelected={handleUpdateIsSelected}
      onAddQuantity={addQuantity}
      onSubtractQuantity={subtractQuantity}
      onRemoveProduct={handleRemoveProduct}
    />
  );
}
