# Prototipo Puma Shop: POS & Backoffice

Este documento delinea la planificación técnica para la construcción del frontend del sistema de estación de carga de combustible y tienda de conveniencia.

## Arquitectura y Stack Tecnológico

El proyecto se construirá utilizando las siguientes tecnologías:
- **Framework**: Next.js (App Router) para manejar múltiples layouts de forma eficiente entre el POS y el backoffice.
- **Estilos**: Tailwind CSS. Se creará un `tailwind.config.ts` personalizado con la paleta de colores de la marca (verdes de Puma, neutros, estados de alerta).
- **Estado Global UI**: Zustand. Manejará carritos, estados de modales, y selecciones activas sin exceso de prop-drilling en componentes complejos.
- **Estado Servidor / Datos**: TanStack React Query. Se encargará de conectar el tipado, caché, y mutaciones del inventario, ventas y surtidores. Todo usando datos Mock por el momento.

---

## Estructura de Rutas (App Router)

### 1. Punto de Venta (POS)
`app/pos/`
- Renderiza la interfaz de operación diaria (Terminal 04).
- Layout sin bordes, optimizado para vista de monitor landscape (Desktop/Tablet). (Se agregó responsividad básica vertical).
- Zonas clave: Menú Lateral (Navegación), Cabecera (Buscador), Panel Central (Catálogos y Surtidores) y Panel Lateral Derecho (Venta Actual/Carrito).
- **Sub-vistas / Modos:**
  - **Arqueo y Cierre de Caja (`/pos/cierre`)**: Pantalla detallada para contabilizar efectivo (billetes), tarjetas y pagos digitales (QR/Pris) contrastando con el Total Esperado por el sistema.

### 2. Administración (Backoffice)
`app/admin/`
- Layout clásico tipo Dashboard con sidebar de navegación.
- **Rutas clave**:
  - `app/admin/inventory`: Tabla principal de productos con filtros.
  - `app/admin/inventory/new`: Formulario de creación de nuevos productos.
  - `app/admin/categories` y `app/admin/suppliers`: Páginas de soporte para ABM.

---

## Manejo de Estado (Store Design)

### Zustand Stores
- **`useCartStore`**: Administra la línea de ticket de venta.
  - `items`: Lista de productos agregados (id, qty, modicadores).
  - `subtotal`, `tax`, `discount`: Propiedades derivadas/calculadas.
  - Mutaciones: `addItem`, `removeItem`, `clearCart`, `applyDescount`.
- **`usePOSStore`**: Administra el estado general del turno en la estación.
  - `pumps`: Estado de "Surtidor 01, 02, etc." (Libre, Cargando, Listo, Monto).
  - `shiftDetails`: Operario activo, terminal ID, totales declarados en el arqueo en tiempo real.
- **`useUIStore`**: Administra modales y vistas.
  - `activeModal`: Para abrir la "Búsqueda de Productos", Confirmaciones, o el modal final de cobro.

### React Query Hooks (Mocked)
- `useProducts(category)`
- `useShiftSummary()`: Retorna totales esperados para el arqueo.
- Mutaciones: `useCloseShiftMutation()`, `useProcessPaymentMutation()`.

---

## Sistema de Componentes (Design System Base)
Se desarrollarán componentes base reutilizables apoyando atajos reales (`F1`, `F10`, `ESC`):
- **Atomics**: Botones (con atajos visuales ej. `F10`), Badges de estado, Inputs genéricos y calculadoras de montos.
- **Cards**: `ProductCard` para grilla POS, `PumpStatusCard` para surtidores, `StatCard` (KPIs en dashboard), `DenominationCard` (para el paneo de billetes en arqueo).
- **Modals**:
  - `DangerConfirmModal`: Destrutivo, ej. borrar producto.
  - `SearchModal`: Búsqueda avanzada con lista navegable por teclado.
  - `PaymentSuccessModal`: Muestra "Imprimiendo Comprobante" y espera la acción `F10` para continuar.
