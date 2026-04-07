import { test, expect } from '@playwright/test';

test.describe('POS Checkout Happy Path', () => {

  test('Debería ser capaz de agregar un producto y finalizar la venta', async ({ page }) => {
    // 1. Ir al POS (el middleware redirigirá a /login si no hay cookie)
    // Seteamos la cookie antes de navegar para simular sesión activa
    await page.context().addCookies([{
      name: 'puma-auth-token',
      value: 'mock-token-cajero',
      url: 'http://localhost:3000',
    }]);

    await page.goto('/pos');

    // 2. Verificar el estado vacío del carrito
    const emptyState = page.locator('text=No hay productos en la venta actual');
    await expect(emptyState).toBeVisible();

    // 3. BUG-4 fix: Usar nombre REAL del mock-data
    await page.locator('text=Caffè Latte Regular').click();

    // 4. Asegurarse de que se agregó al panel de la derecha
    await expect(page.locator('text=Caffè Latte Regular').last()).toBeVisible();
    // BUG-5 fix: Precio real del producto
    await expect(page.locator('text=$4.50')).toBeVisible();

    // 5. BUG-6 fix: Buscar solo por texto parcial "Cobrar"
    await page.locator('button:has-text("Cobrar")').click();

    // 6. Verificar modal de "Imprimiendo"
    await expect(page.locator('text=Imprimiendo Comprobante')).toBeVisible();

    // 7. Esperar y verificar modal "Transacción Finalizada"
    await expect(page.locator('text=Transacción Finalizada')).toBeVisible({ timeout: 5000 });

    // 8. Cerrar el modal
    await page.locator('button:has-text("Transacción Finalizada")').click();

    // 9. Verificar que el carrito quedó vacío otra vez
    await expect(emptyState).toBeVisible();
  });

});
