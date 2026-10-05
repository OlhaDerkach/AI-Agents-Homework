import { test, expect } from '@playwright/test';

test('guest can add Audi TT to Garage', async ({ page }) => {
  // Setup: guest profile (preparation, not the main check)
  await page.goto('/');
  await page.getByRole('button', { name: 'Guest log in' }).click();
  await expect(page).toHaveURL(/panel\/garage/);

  // Actions: Add car -> Audi -> TT -> Mileage 12000 -> Add
  await page.getByRole('button', { name: 'Add car' }).click();
  const addCarDialog = page.getByRole('dialog');
  await expect(addCarDialog).toBeVisible();

  await addCarDialog.getByLabel('Brand').selectOption('Audi');
  await addCarDialog.getByLabel('Model').selectOption('TT');
  await addCarDialog.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');
  await addCarDialog.getByRole('button', { name: 'Add', exact: true }).click();

  // Assertions: still on Garage, modal closed, Audi TT is listed in Garage
  await expect(page).toHaveURL(/panel\/garage/);
  await expect(addCarDialog).toBeHidden();

  const audiTT = page.getByRole('listitem').filter({ hasText: 'Audi TT' });
  await expect(audiTT).toBeVisible();
  await expect(audiTT.getByText('Audi TT')).toBeVisible();
  await expect(audiTT.getByRole('spinbutton')).toHaveValue('12000');
});
