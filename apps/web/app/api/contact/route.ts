import { createLogger } from "@doingbusiness/config";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const StructuredContactSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(120).optional(),
  position: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional()
});

const LegacyContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional()
});

const ContactRequestSchema = z.union([StructuredContactSchema, LegacyContactSchema]);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = ContactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datele formularului sunt invalide." }, { status: 400 });
  }
  const logger = createLogger("contact-form");
  logger.info(
    {
      emailDomain: parsed.data.email.split("@")[1] ?? "unknown",
      messageLength: parsed.data.message.length
    },
    "Validated contact lead"
  );
  return NextResponse.json({ accepted: true }, { status: 202 });
}
