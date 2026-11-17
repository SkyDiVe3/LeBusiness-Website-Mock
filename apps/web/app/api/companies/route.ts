import { CompanyDirectoryQuerySchema, searchCompanies } from "@doingbusiness/domain";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SearchParameterSchema = z.object({
  q: z.string().optional(), county: z.string().optional(), caen: z.string().optional(), sort: z.string().optional(), page: z.string().optional(), pageSize: z.string().optional()
});

export function GET(request: NextRequest): NextResponse {
  const rawParameters = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = SearchParameterSchema.safeParse(rawParameters);
  if (!parsed.success) return NextResponse.json({ error: "Parametri de căutare invalizi." }, { status: 400 });
  const query = CompanyDirectoryQuerySchema.safeParse(parsed.data);
  if (!query.success) return NextResponse.json({ error: "Filtre de căutare invalide.", issues: query.error.flatten() }, { status: 400 });
  return NextResponse.json(searchCompanies(query.data), { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
}
