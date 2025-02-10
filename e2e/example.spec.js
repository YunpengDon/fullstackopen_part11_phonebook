// @ts-check
import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Phonebook/)
})

test('can add new person', async ({ page }) => {
  // await new Promise(resolve => setTimeout(resolve, 500))
  await page.goto('')
  await page.getByPlaceholder('name').fill('testName@playwright')
  await page.getByPlaceholder('number').fill('123-45678')
  await page.getByRole('button').getByText('add').click()
  // await page.reload()
  await new Promise(resolve => setTimeout(resolve, 1000))
  await expect(page.getByText('testName@playwright 123-45678')).toBeVisible()
})

test('can delete person', async ({ page }) => {
  page.on('dialog', async dialog => {
    await dialog.accept()
  })
  await page.goto('')
  await page.getByText('testName@playwright').locator('button').click()
  await new Promise(resolve => setTimeout(resolve, 1000))
  await expect(page.getByText('testName@playwright 123-45678')).not.toBeVisible()
})