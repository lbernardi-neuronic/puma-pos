# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pos.spec.ts >> POS Checkout Happy Path >> Debería ser capaz de agregar un producto y finalizar la venta
- Location: e2e\pos.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=$4.50')
Expected: visible
Error: strict mode violation: locator('text=$4.50') resolved to 4 elements:
    1) <p class="text-brand-primary font-black text-lg">…</p> aka getByRole('paragraph').filter({ hasText: /^\$4\.50$/ })
    2) <p class="text-[11px] text-slate-400 font-medium mt-0.5">Cant.: 1  •  $4.50 c/u</p> aka getByText('Cant.: 1 • $4.50 c/u')
    3) <span class="text-sm font-bold text-slate-800">$4.50</span> aka getByText('$4.50').nth(2)
    4) <span>…</span> aka getByText('$4.50').nth(3)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=$4.50')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]: PUMA
        - generic [ref=e7]: POS
      - navigation [ref=e8]:
        - link "Playa" [ref=e9] [cursor=pointer]:
          - /url: /pos/playa
          - img [ref=e10]
          - generic [ref=e13]: Playa
        - link "Tienda" [ref=e14] [cursor=pointer]:
          - /url: /pos
          - img [ref=e16]
          - generic [ref=e19]: Tienda
        - link "Servicios" [ref=e20] [cursor=pointer]:
          - /url: /pos/servicios
          - img [ref=e21]
          - generic [ref=e24]: Servicios
        - link "Historial" [ref=e25] [cursor=pointer]:
          - /url: /pos/historial
          - img [ref=e26]
          - generic [ref=e29]: Historial
        - link "Reportes" [ref=e30] [cursor=pointer]:
          - /url: /pos/reportes
          - img [ref=e31]
          - generic [ref=e33]: Reportes
      - generic [ref=e34]:
        - generic [ref=e35]: Terminal 04
        - generic [ref=e36]: ACTIVO
        - button "Cerrar sesión" [ref=e37] [cursor=pointer]:
          - img [ref=e38]
    - generic [ref=e42]:
      - banner [ref=e43]:
        - heading "Puma Shop POS" [level=1] [ref=e45]
        - generic [ref=e47] [cursor=pointer]:
          - img [ref=e48]
          - generic [ref=e51]: Buscar productos o SKU...
          - generic [ref=e53]: F1
        - generic [ref=e54]:
          - button "Historial Ticket" [ref=e55] [cursor=pointer]:
            - img [ref=e56]
          - button "Turno" [ref=e60] [cursor=pointer]:
            - img [ref=e61]
          - button "Reimprimir" [ref=e64] [cursor=pointer]:
            - img [ref=e65]
      - generic [ref=e69]:
        - button "Café y Bebidas Calientes" [ref=e70] [cursor=pointer]
        - button "Snacks Frescos" [ref=e71] [cursor=pointer]
        - button "Bebidas" [ref=e72] [cursor=pointer]
        - button "Lubricantes" [ref=e73] [cursor=pointer]
      - generic [ref=e75]:
        - generic [ref=e76] [cursor=pointer]:
          - generic [ref=e77]:
            - img "Caffè Latte Regular" [ref=e78]
            - generic [ref=e79]: CALIENTE
          - generic [ref=e80]:
            - heading "Caffè Latte Regular" [level=3] [ref=e81]
            - paragraph [ref=e82]: $4.50
        - generic [ref=e83] [cursor=pointer]:
          - img "Double Espresso" [ref=e85]
          - generic [ref=e86]:
            - heading "Double Espresso" [level=3] [ref=e87]
            - paragraph [ref=e88]: $3.20
        - generic [ref=e89] [cursor=pointer]:
          - img "Cappuccino Grande" [ref=e91]
          - generic [ref=e92]:
            - heading "Cappuccino Grande" [level=3] [ref=e93]
            - paragraph [ref=e94]: $5.10
        - generic [ref=e95] [cursor=pointer]:
          - img "Matcha Premium" [ref=e97]
          - generic [ref=e98]:
            - heading "Matcha Premium" [level=3] [ref=e99]
            - paragraph [ref=e100]: $5.80
        - generic [ref=e101] [cursor=pointer]:
          - img "Submarino / Chocolate" [ref=e103]
          - generic [ref=e104]:
            - heading "Submarino / Chocolate" [level=3] [ref=e105]
            - paragraph [ref=e106]: $4.00
      - generic [ref=e108]:
        - generic [ref=e109] [cursor=pointer]:
          - generic [ref=e110]: SURTIDOR 01
          - generic [ref=e111]: $45.00
          - generic [ref=e112]: Listo
        - generic [ref=e113] [cursor=pointer]:
          - generic [ref=e114]: SURTIDOR 02
          - generic [ref=e115]: $12.40
          - generic [ref=e116]: Despachando
        - generic [ref=e117] [cursor=pointer]:
          - generic [ref=e118]: SURTIDOR 03
          - generic [ref=e119]: $0.00
          - generic [ref=e120]: Libre
        - generic [ref=e121] [cursor=pointer]:
          - generic [ref=e122]: SURTIDOR 04
          - generic [ref=e123]: $78.30
          - generic [ref=e124]: Listo
        - generic [ref=e125] [cursor=pointer]:
          - generic [ref=e126]: SURTIDOR 05
          - generic [ref=e127]: $0.00
          - generic [ref=e128]: Fuera de Servicio
        - generic [ref=e129] [cursor=pointer]:
          - generic [ref=e130]: SURTIDOR 06
          - generic [ref=e131]: $0.00
          - generic [ref=e132]: Libre
    - complementary [ref=e134]:
      - generic [ref=e135]:
        - generic [ref=e136]:
          - heading "Venta Actual" [level=2] [ref=e137]
          - generic [ref=e138]:
            - generic [ref=e139]: "ID: #88291"
            - generic [ref=e140]: "SUCURSAL: 104"
        - button "Vaciar carrito" [ref=e141] [cursor=pointer]:
          - img [ref=e142]
      - generic [ref=e146]:
        - generic [ref=e147]:
          - heading "Caffè Latte Regular" [level=3] [ref=e148]
          - paragraph [ref=e149]: "Cant.: 1 • $4.50 c/u"
        - generic [ref=e150]:
          - generic [ref=e151]: $4.50
          - button "Eliminar producto" [ref=e152] [cursor=pointer]:
            - img [ref=e153]
      - generic [ref=e157]:
        - generic [ref=e161]:
          - paragraph [ref=e162]: Puma Pris
          - paragraph [ref=e163]: Escanear tarjeta socio
        - button "Aplicar" [ref=e164] [cursor=pointer]
      - generic [ref=e165]:
        - generic [ref=e166]:
          - generic [ref=e167]:
            - generic [ref=e168]: Subtotal
            - generic [ref=e169]: $4.50
          - generic [ref=e170]:
            - generic [ref=e171]: IVA (21%)
            - generic [ref=e172]: $0.94
        - generic [ref=e173]:
          - generic [ref=e174]: Total a Pagar
          - generic [ref=e175]: $5.45
        - generic [ref=e176]:
          - button "[F8] Efectivo" [ref=e177] [cursor=pointer]:
            - generic [ref=e178]: "[F8]"
            - generic [ref=e179]: Efectivo
          - button "[F10] Cobrar" [ref=e180] [cursor=pointer]:
            - generic [ref=e181]: "[F10]"
            - generic [ref=e182]: Cobrar
  - alert [ref=e183]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('POS Checkout Happy Path', () => {
  4  | 
  5  |   test('Debería ser capaz de agregar un producto y finalizar la venta', async ({ page }) => {
  6  |     // 1. Ir al POS (el middleware redirigirá a /login si no hay cookie)
  7  |     // Seteamos la cookie antes de navegar para simular sesión activa
  8  |     await page.context().addCookies([{
  9  |       name: 'puma-auth-token',
  10 |       value: 'mock-token-cajero',
  11 |       url: 'http://localhost:3000',
  12 |     }]);
  13 | 
  14 |     await page.goto('/pos');
  15 | 
  16 |     // 2. Verificar el estado vacío del carrito
  17 |     const emptyState = page.locator('text=No hay productos en la venta actual');
  18 |     await expect(emptyState).toBeVisible();
  19 | 
  20 |     // 3. BUG-4 fix: Usar nombre REAL del mock-data
  21 |     await page.locator('text=Caffè Latte Regular').click();
  22 | 
  23 |     // 4. Asegurarse de que se agregó al panel de la derecha
  24 |     await expect(page.locator('text=Caffè Latte Regular').last()).toBeVisible();
  25 |     // BUG-5 fix: Precio real del producto
> 26 |     await expect(page.locator('text=$4.50')).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  27 | 
  28 |     // 5. BUG-6 fix: Buscar solo por texto parcial "Cobrar"
  29 |     await page.locator('button:has-text("Cobrar")').click();
  30 | 
  31 |     // 6. Verificar modal de "Imprimiendo"
  32 |     await expect(page.locator('text=Imprimiendo Comprobante')).toBeVisible();
  33 | 
  34 |     // 7. Esperar y verificar modal "Transacción Finalizada"
  35 |     await expect(page.locator('text=Transacción Finalizada')).toBeVisible({ timeout: 5000 });
  36 | 
  37 |     // 8. Cerrar el modal
  38 |     await page.locator('button:has-text("Transacción Finalizada")').click();
  39 | 
  40 |     // 9. Verificar que el carrito quedó vacío otra vez
  41 |     await expect(emptyState).toBeVisible();
  42 |   });
  43 | 
  44 | });
  45 | 
```