import { expect, test, type Page } from "@playwright/test"
import { profile } from "@/content/profile"
import { getDictionary } from "@/content/ui"

const fr = getDictionary("fr")
const en = getDictionary("en")

async function openNav(page: Page, isMobile: boolean) {
  if (isMobile) await page.getByRole("button", { name: fr.a11y.openMenu }).click()
}

test.describe("smoke", () => {
  test("home page loads in French without console errors", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })

    const response = await page.goto("/")
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(new RegExp(profile.shortName))
    await expect(page.locator("html")).toHaveAttribute("lang", "fr")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(profile.fullName)
    await expect(page.getByRole("main")).toBeVisible()
    await expect(page.getByRole("contentinfo")).toBeVisible()
    expect(errors).toEqual([])
  })

  test("skip link is the first tab stop and moves focus to main", async ({ page }) => {
    await page.goto("/")
    await page.keyboard.press("Tab")
    const skip = page.getByRole("link", { name: fr.a11y.skipToContent })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press("Enter")
    await expect(page.getByRole("main")).toBeFocused()
  })

  test("header navigation scrolls to a section", async ({ page, isMobile }) => {
    await page.goto("/")
    await openNav(page, isMobile)
    await page
      .getByRole("navigation", { name: fr.a11y.mainNav })
      .getByRole("link", { name: fr.nav.projects, exact: true })
      .click()
    await expect(page).toHaveURL(/#projects$/)
    await expect(page.locator("#projects")).toBeInViewport()
  })

  test("language switch toggles between French and English", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: new RegExp(fr.a11y.switchTo) }).first().click()
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page.getByRole("heading", { level: 2, name: en.contact.title })).toBeAttached()

    await page.getByRole("link", { name: new RegExp(en.a11y.switchTo) }).first().click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator("html")).toHaveAttribute("lang", "fr")
  })

  test("case study page is reachable", async ({ page }) => {
    const response = await page.goto("/projects/sovereign-ai-engine")
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })
})

test.describe("contact form", () => {
  const fill = async (page: Page) => {
    await page.getByRole("textbox", { name: new RegExp(`^${fr.contact.name}`) }).fill("Ada Lovelace")
    await page.getByRole("textbox", { name: new RegExp(`^${fr.contact.email}`) }).fill("ada@example.com")
    await page.getByRole("textbox", { name: new RegExp(`^${fr.contact.subject}`) }).fill("Mission data")
    await page.getByRole("textbox", { name: new RegExp(`^${fr.contact.message}`) }).fill("Bonjour, parlons d'une plateforme RAG.")
  }

  test("shows accessible validation errors without calling the API", async ({ page }) => {
    let called = false
    await page.route("**/api/contact", (route) => {
      called = true
      return route.fulfill({ json: { success: true } })
    })
    await page.goto("/#contact")
    await page.getByRole("button", { name: fr.contact.send }).click()

    await expect(page.getByText(fr.contact.errorSummary(4))).toBeVisible()
    const name = page.getByRole("textbox", { name: new RegExp(`^${fr.contact.name}`) })
    await expect(name).toHaveAttribute("aria-invalid", "true")
    await expect(name).toBeFocused()
    await expect(name).toHaveAccessibleDescription(fr.contact.errors.nameShort)
    expect(called).toBe(false)
  })

  test("submits a valid message and announces success", async ({ page }) => {
    let payload: Record<string, unknown> | null = null
    await page.route("**/api/contact", async (route) => {
      payload = route.request().postDataJSON()
      await route.fulfill({ json: { success: true } })
    })
    await page.goto("/#contact")
    await fill(page)
    await page.getByRole("button", { name: fr.contact.send }).click()

    await expect(page.getByRole("status").filter({ hasText: fr.contact.sentTitle })).toBeVisible()
    expect(payload).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Mission data",
      locale: "fr",
      website: "",
    })
    expect(typeof payload!.startedAt).toBe("number")
  })

  test("reports rate limiting from the API", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 429, json: { error: "rate_limited" }, headers: { "Retry-After": "600" } }),
    )
    await page.goto("/#contact")
    await fill(page)
    await page.getByRole("button", { name: fr.contact.send }).click()
    await expect(page.getByRole("alert").filter({ hasText: fr.contact.errorRateLimited })).toBeVisible()
  })
})
