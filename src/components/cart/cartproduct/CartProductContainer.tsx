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
  const { id, price, quantity, imageURL, name, amount, isSelected } = product;

  const addQuantity = () => {
    const newQuantity = quantity + 1;
    if (newQuantity > amount) {
      return;
    }
    onUpdateQuantity(id, newQuantity);
  };

  const subtractQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) {
      return;
    }
    onUpdateQuantity(id, newQuantity);
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
