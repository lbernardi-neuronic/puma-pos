export type Category = 'Café y Bebidas Calientes' | 'Snacks Frescos' | 'Bebidas' | 'Lubricantes' | 'Combustibles' | 'Merchandising';

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: Category;
  stock: number;
  image?: string;
  tags?: string[];
  status: 'en_stock' | 'stock_bajo' | 'critico';
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    sku: 'CAF-001',
    name: 'Caffè Latte Regular',
    price: 4.50,
    category: 'Café y Bebidas Calientes',
    stock: 50,
    tags: ['CALIENTE'],
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p2',
    sku: 'CAF-002',
    name: 'Double Espresso',
    price: 3.20,
    category: 'Café y Bebidas Calientes',
    stock: 120,
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1510061164805-430ed6b95b45?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p3',
    sku: 'CAF-003',
    name: 'Cappuccino Grande',
    price: 5.10,
    category: 'Café y Bebidas Calientes',
    stock: 45,
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1534687941688-19208f8a543f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p4',
    sku: 'BEB-001',
    name: 'Iced Americano',
    price: 4.25,
    category: 'Bebidas',
    stock: 60,
    tags: ['FRÍO'],
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf98aa03ec?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p5',
    sku: 'CAF-004',
    name: 'Matcha Premium',
    price: 5.80,
    category: 'Café y Bebidas Calientes',
    stock: 30,
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2b4d3002?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p6',
    sku: 'CAF-005',
    name: 'Submarino / Chocolate',
    price: 4.00,
    category: 'Café y Bebidas Calientes',
    stock: 40,
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p7',
    sku: 'SNA-001',
    name: 'Medialuna de Manteca',
    price: 2.95,
    category: 'Snacks Frescos',
    stock: 12,
    status: 'stock_bajo',
    image: 'https://images.unsplash.com/photo-1549903072-7e6e0d65605d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p8',
    sku: 'SNA-002',
    name: 'Muffin de Arándanos',
    price: 3.50,
    category: 'Snacks Frescos',
    stock: 25,
    status: 'en_stock',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p9',
    sku: 'FUEL-001',
    name: 'Combustible Puma Speed 95 - 20L',
    price: 34.50,
    category: 'Combustibles',
    stock: 12500,
    status: 'en_stock'
  },
  {
    id: 'p10',
    sku: 'LUB-001',
    name: 'Aceite de Motor Puma Performance 5W-30',
    price: 12.99,
    category: 'Lubricantes',
    stock: 48,
    status: 'en_stock'
  },
  {
    id: 'p11',
    sku: 'MER-001',
    name: 'Llavero Puma',
    price: 5.00,
    category: 'Merchandising',
    stock: 2,
    status: 'critico'
  }
];

export type PumpStatus = 'Libre' | 'Despachando' | 'Listo' | 'Fuera de Servicio';
export type FuelType = 'Speed 95' | 'Gasoil Premium' | 'Infinia' | 'Super';

export interface Pump {
  id: string;
  name: string;
  status: PumpStatus;
  amount: number;
  fuelType?: FuelType;
  liters?: number;
}

export const mockPumps: Pump[] = [
  { id: 'pump-1', name: 'SURTIDOR 01', status: 'Listo', amount: 45.00, fuelType: 'Speed 95', liters: 30.0 },
  { id: 'pump-2', name: 'SURTIDOR 02', status: 'Despachando', amount: 12.40, fuelType: 'Gasoil Premium', liters: 15.2 },
  { id: 'pump-3', name: 'SURTIDOR 03', status: 'Libre', amount: 0.00 },
  { id: 'pump-4', name: 'SURTIDOR 04', status: 'Listo', amount: 78.30, fuelType: 'Infinia', liters: 42.5 },
  { id: 'pump-5', name: 'SURTIDOR 05', status: 'Fuera de Servicio', amount: 0.00 },
  { id: 'pump-6', name: 'SURTIDOR 06', status: 'Libre', amount: 0.00 },
];

// ── Recent Dispatches ───────────────────────────────────────

export interface Dispatch {
  id: string;
  pumpName: string;
  fuelType: FuelType;
  amount: number;
  liters: number;
  time: string;
}

export const mockDispatches: Dispatch[] = [
  { id: '#4521', pumpName: 'Surt. 01', fuelType: 'Speed 95', amount: 45.00, liters: 30.0, time: '14:22' },
  { id: '#4520', pumpName: 'Surt. 03', fuelType: 'Gasoil Premium', amount: 78.30, liters: 52.2, time: '14:15' },
  { id: '#4519', pumpName: 'Surt. 04', fuelType: 'Infinia', amount: 120.00, liters: 60.0, time: '14:02' },
  { id: '#4518', pumpName: 'Surt. 02', fuelType: 'Super', amount: 35.00, liters: 25.0, time: '13:48' },
  { id: '#4517', pumpName: 'Surt. 06', fuelType: 'Speed 95', amount: 55.60, liters: 37.1, time: '13:31' },
];

// ── Tickets / Historial ─────────────────────────────────────

export type PaymentMethod = 'Efectivo' | 'Visa' | 'Mastercard' | 'MercadoPago QR' | 'MODO';

export interface TicketItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Ticket {
  id: string;
  time: string;
  items: TicketItem[];
  paymentMethod: PaymentMethod;
  total: number;
  status: 'completado' | 'anulado';
}

export const mockTickets: Ticket[] = [
  { id: '#88291', time: '14:32', items: [
    { name: 'Caffè Latte Regular', quantity: 2, price: 4.50 },
    { name: 'Muffin de Arándanos', quantity: 1, price: 3.50 },
  ], paymentMethod: 'Visa', total: 12.50, status: 'completado' },
  { id: '#88290', time: '14:25', items: [
    { name: 'Combustible Speed 95 - 20L', quantity: 1, price: 34.50 },
  ], paymentMethod: 'Efectivo', total: 34.50, status: 'completado' },
  { id: '#88289', time: '14:18', items: [
    { name: 'Double Espresso', quantity: 1, price: 3.20 },
    { name: 'Cappuccino Grande', quantity: 2, price: 5.10 },
    { name: 'Medialuna de Manteca', quantity: 3, price: 2.95 },
    { name: 'Iced Americano', quantity: 1, price: 4.25 },
  ], paymentMethod: 'MercadoPago QR', total: 26.50, status: 'completado' },
  { id: '#88288', time: '13:55', items: [
    { name: 'Matcha Premium', quantity: 1, price: 5.80 },
    { name: 'Submarino / Chocolate', quantity: 1, price: 4.00 },
  ], paymentMethod: 'Efectivo', total: 9.80, status: 'completado' },
  { id: '#88287', time: '13:40', items: [
    { name: 'Aceite de Motor Puma Performance 5W-30', quantity: 1, price: 12.99 },
    { name: 'Caffè Latte Regular', quantity: 1, price: 4.50 },
    { name: 'Llavero Puma', quantity: 2, price: 5.00 },
  ], paymentMethod: 'Mastercard', total: 27.49, status: 'completado' },
  { id: '#88286', time: '13:22', items: [
    { name: 'Cappuccino Grande', quantity: 1, price: 5.10 },
  ], paymentMethod: 'MODO', total: 5.10, status: 'anulado' },
  { id: '#88285', time: '13:10', items: [
    { name: 'Double Espresso', quantity: 2, price: 3.20 },
    { name: 'Medialuna de Manteca', quantity: 2, price: 2.95 },
  ], paymentMethod: 'Efectivo', total: 12.30, status: 'completado' },
  { id: '#88284', time: '12:45', items: [
    { name: 'Combustible Speed 95 - 20L', quantity: 2, price: 34.50 },
  ], paymentMethod: 'Visa', total: 69.00, status: 'completado' },
];

// ── Hourly Sales (for Reports chart) ────────────────────────

export interface HourlySale {
  hour: string;
  amount: number;
  tickets: number;
}

export const mockHourlySales: HourlySale[] = [
  { hour: '06:00', amount: 120.50, tickets: 3 },
  { hour: '07:00', amount: 340.00, tickets: 8 },
  { hour: '08:00', amount: 580.25, tickets: 14 },
  { hour: '09:00', amount: 445.80, tickets: 11 },
  { hour: '10:00', amount: 380.00, tickets: 9 },
  { hour: '11:00', amount: 290.75, tickets: 7 },
  { hour: '12:00', amount: 520.00, tickets: 12 },
  { hour: '13:00', amount: 610.30, tickets: 15 },
  { hour: '14:00', amount: 350.00, tickets: 8 },
];

// ── Categories ──────────────────────────────────────────────

export interface CategoryItem {
  id: string;
  name: Category;
  icon: string;
  color: string;        // Tailwind-safe hex color for badges
  description: string;
  active: boolean;
}

export const mockCategories: CategoryItem[] = [
  { id: 'cat-1', name: 'Café y Bebidas Calientes', icon: '☕', color: '#6b4226', description: 'Café de especialidad, infusiones y bebidas calientes preparadas en tienda.', active: true },
  { id: 'cat-2', name: 'Snacks Frescos', icon: '🥐', color: '#d97706', description: 'Medialunas, muffins, sandwiches y snacks de panadería artesanal.', active: true },
  { id: 'cat-3', name: 'Bebidas', icon: '🥤', color: '#0284c7', description: 'Bebidas frías, jugos naturales, aguas saborizadas y gaseosas.', active: true },
  { id: 'cat-4', name: 'Combustibles', icon: '⛽', color: '#dc2626', description: 'Naftas, gasoil y combustibles premium Puma Energy.', active: true },
  { id: 'cat-5', name: 'Lubricantes', icon: '🛢️', color: '#4338ca', description: 'Aceites de motor, líquidos de frenos y aditivos automotrices.', active: true },
  { id: 'cat-6', name: 'Merchandising', icon: '🏷️', color: '#059669', description: 'Productos de marca Puma: llaveros, gorras y artículos promocionales.', active: true },
];

// ── Suppliers ───────────────────────────────────────────────

export type CondicionIVA = 'Responsable Inscripto' | 'Monotributista' | 'Exento' | 'Consumidor Final';

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  cuit: string;
  address: string;
  condicionIVA: CondicionIVA;
  category: Category;
  notes: string;
  active: boolean;
}

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-1', name: 'Café del Sur S.A.', contact: 'María González', phone: '011-4555-8901',
    email: 'ventas@cafedelsur.com.ar', cuit: '30-71234567-8', address: 'Av. San Martín 1240, CABA',
    condicionIVA: 'Responsable Inscripto', category: 'Café y Bebidas Calientes',
    notes: 'Entrega semanal los martes. Descuento 10% por volumen.', active: true,
  },
  {
    id: 'sup-2', name: 'Distribuidora Norte', contact: 'Carlos Méndez', phone: '011-4888-3322',
    email: 'carlos@distnorte.com.ar', cuit: '20-28345678-1', address: 'Ruta 8 km 42, Pilar',
    condicionIVA: 'Responsable Inscripto', category: 'Snacks Frescos',
    notes: 'Plazo de pago 30 días. Mínimo de compra $50.000.', active: true,
  },
  {
    id: 'sup-3', name: 'Panadería Don Pedro', contact: 'Roberto Paz', phone: '011-4222-7744',
    email: 'donpedro@gmail.com', cuit: '20-14567890-3', address: 'Calle Rivadavia 890, Morón',
    condicionIVA: 'Monotributista', category: 'Snacks Frescos',
    notes: 'Entrega diaria a las 6 AM. Producto artesanal.', active: true,
  },
  {
    id: 'sup-4', name: 'Puma Energy Argentina', contact: 'Logística Puma', phone: '0800-222-PUMA',
    email: 'logistica@pumaenergy.com', cuit: '30-70987654-2', address: 'Puerto Madero, CABA',
    condicionIVA: 'Responsable Inscripto', category: 'Combustibles',
    notes: 'Contrato anual. Carga programada cada 48 hs.', active: true,
  },
  {
    id: 'sup-5', name: 'Lubricantes AR S.R.L.', contact: 'Ana Torres', phone: '011-4999-1100',
    email: 'atorres@lubricantesar.com', cuit: '30-71456789-0', address: 'Parque Industrial, Avellaneda',
    condicionIVA: 'Responsable Inscripto', category: 'Lubricantes',
    notes: 'Proveedor exclusivo de línea Puma Performance.', active: true,
  },
  {
    id: 'sup-6', name: 'Bebidas Express', contact: 'Luciana Romero', phone: '011-4333-5566',
    email: 'pedidos@bebidasexpress.com.ar', cuit: '30-71567890-4', address: 'Av. Corrientes 3200, CABA',
    condicionIVA: 'Responsable Inscripto', category: 'Bebidas',
    notes: 'Entrega en 24 hs. Catálogo completo de gaseosas y jugos.', active: false,
  },
];
