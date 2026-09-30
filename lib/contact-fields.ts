/** Zod-free contact constants, safe to import in client bundles without pulling in the schema. */

export const CONTACT_LIMITS = { name: 100, email: 254, subject: 200, message: 2000 } as const

/** Submissions faster than this after the form is displayed are treated as bots. */
export const MIN_FILL_MS = 2500

export type ContactField = "name" | "email" | "subject" | "message"
export type ContactErrorCode =
  | "nameShort"
  | "nameLong"
  | "emailInvalid"
  | "subjectShort"
  | "subjectLong"
  | "messageShort"
  | "messageLong"
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>

export const CONTACT_FIELDS: ContactField[] = ["name", "email", "subject", "message"]

/** Honeypot + timing trap payload sent alongside the form fields. */
export type ContactTraps = { website?: string; startedAt?: number }
