import { z } from "zod"
import { locales } from "@/content/types"
import { CONTACT_FIELDS, CONTACT_LIMITS, type ContactErrorCode, type ContactErrors, type ContactField } from "./contact-fields"

export * from "./contact-fields"

/** Error messages are codes, translated by the client (see `contact.errors` in content/ui.ts). */
const text = (code: ContactErrorCode) => z.string({ required_error: code, invalid_type_error: code }).trim()

export const contactSchema = z.object({
  name: text("nameShort").min(2, "nameShort").max(CONTACT_LIMITS.name, "nameLong"),
  email: text("emailInvalid").email("emailInvalid").max(CONTACT_LIMITS.email, "emailInvalid"),
  subject: text("subjectShort").min(3, "subjectShort").max(CONTACT_LIMITS.subject, "subjectLong"),
  message: text("messageShort").min(10, "messageShort").max(CONTACT_LIMITS.message, "messageLong"),
  locale: z.enum(locales).catch("fr"),
})

export type ContactInput = z.infer<typeof contactSchema>

export function fieldErrors(error: z.ZodError): ContactErrors {
  const errors: ContactErrors = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === "string" && (CONTACT_FIELDS as string[]).includes(field) && !errors[field as ContactField]) {
      errors[field as ContactField] = issue.message as ContactErrorCode
    }
  }
  return errors
}

export function validateContact(input: unknown) {
  const parsed = contactSchema.safeParse(input)
  return parsed.success
    ? ({ success: true, data: parsed.data } as const)
    : ({ success: false, errors: fieldErrors(parsed.error) } as const)
}
