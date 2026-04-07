import { useCartStore } from '../useCartStore';
import { Product } from '@/lib/mock-data';

// BUG-2 fix: Factory pattern (skill: testing-patterns)
const getMockProduct = (overrides?: Partial<Product>): Product => ({
  id: 'p-test-1',
  name: 'Test Product',
  sku: 'TEST-01',
  price: 100,
  category: 'Bebidas',
  status: 'en_stock',
  stock: 10,
  ...overrides,
});

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should add an item successfully', () => {
    const product = getMockProduct();

    useCartStore.getState().addItem(product);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    // BUG-1 fix: CartItem extends Product, so name is directly on the item
    expect(items[0].name).toBe('Test Product');
    expect(items[0].quantity).toBe(1);
  });

  it('should increment quantity when adding the same product twice', () => {
    const product = getMockProduct();

    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should calculate subtotal correctly', () => {
    const product1 = getMockProduct({ id: 'p-1', price: 100 });
    const product2 = getMockProduct({ id: 'p-2', name: 'Prod2', sku: 'T2', price: 50 });

    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product2);
    useCartStore.getState().addItem(product2); // x2

    expect(useCartStore.getState().getSubtotal()).toBe(200); // 100 + (50 * 2)
  });

  it('should remove items by cartId', () => {
    const product = getMockProduct();

    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);

    expect(useCartStore.getState().items[0].quantity).toBe(2);

    // BUG-2 fix: removeItem uses cartId (string), not product id
    const cartId = useCartStore.getState().items[0].cartId;
    useCartStore.getState().removeItem(cartId);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should update quantity and remove if zero', () => {
    const product = getMockProduct();
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);

    const cartId = useCartStore.getState().items[0].cartId;

    useCartStore.getState().updateQuantity(cartId, 1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);

    useCartStore.getState().updateQuantity(cartId, 0);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should calculate final total including 21% IVA', () => {
    const product = getMockProduct({ price: 100 });
    useCartStore.getState().addItem(product);

    // Subtotal 100 + Tax(21) = Total 121
    expect(useCartStore.getState().getTotal()).toBe(121);
  });

  it('should apply discount and reflect in total', () => {
    const product = getMockProduct({ price: 100 });
    useCartStore.getState().addItem(product);
    useCartStore.getState().applyDiscount(10);

    // 100 + 21 (IVA) - 10 (discount) = 111
    expect(useCartStore.getState().getTotal()).toBe(111);
  });

  it('should clear cart entirely', () => {
    useCartStore.getState().addItem(getMockProduct());
    useCartStore.getState().applyDiscount(5);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().discount).toBe(0);
  });
});
