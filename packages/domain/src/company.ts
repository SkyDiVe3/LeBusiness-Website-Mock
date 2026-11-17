import { z } from "zod";

export const RomanianCountyCodeSchema = z.enum([
  "AB", "AG", "AR", "B", "BC", "BH", "BN", "BR", "BT", "BV", "BZ", "CJ", "CL", "CS", "CT", "CV", "DB",
  "DJ", "GJ", "GL", "GR", "HD", "HR", "IF", "IL", "IS", "MH", "MM", "MS", "NT", "OT", "PH", "SB", "SJ",
  "SM", "SV", "TL", "TM", "TR", "VL", "VN", "VS"
]);

export type RomanianCountyCode = z.infer<typeof RomanianCountyCodeSchema>;

export const romanianCounties = [
  { code: "AB", name: "Alba" }, { code: "AG", name: "Argeș" }, { code: "AR", name: "Arad" },
  { code: "B", name: "București" }, { code: "BC", name: "Bacău" }, { code: "BH", name: "Bihor" },
  { code: "BN", name: "Bistrița-Năsăud" }, { code: "BR", name: "Brăila" }, { code: "BT", name: "Botoșani" },
  { code: "BV", name: "Brașov" }, { code: "BZ", name: "Buzău" }, { code: "CJ", name: "Cluj" },
  { code: "CL", name: "Călărași" }, { code: "CS", name: "Caraș-Severin" }, { code: "CT", name: "Constanța" },
  { code: "CV", name: "Covasna" }, { code: "DB", name: "Dâmbovița" }, { code: "DJ", name: "Dolj" },
  { code: "GJ", name: "Gorj" }, { code: "GL", name: "Galați" }, { code: "GR", name: "Giurgiu" },
  { code: "HD", name: "Hunedoara" }, { code: "HR", name: "Harghita" }, { code: "IF", name: "Ilfov" },
  { code: "IL", name: "Ialomița" }, { code: "IS", name: "Iași" }, { code: "MH", name: "Mehedinți" },
  { code: "MM", name: "Maramureș" }, { code: "MS", name: "Mureș" }, { code: "NT", name: "Neamț" },
  { code: "OT", name: "Olt" }, { code: "PH", name: "Prahova" }, { code: "SB", name: "Sibiu" },
  { code: "SJ", name: "Sălaj" }, { code: "SM", name: "Satu Mare" }, { code: "SV", name: "Suceava" },
  { code: "TL", name: "Tulcea" }, { code: "TM", name: "Timiș" }, { code: "TR", name: "Teleorman" },
  { code: "VL", name: "Vâlcea" }, { code: "VN", name: "Vrancea" }, { code: "VS", name: "Vaslui" }
] satisfies ReadonlyArray<{ code: RomanianCountyCode; name: string }>;

export const RomanianCuiSchema = z.string()
  .trim()
  .regex(/^[1-9][0-9]{1,9}$/, "CUI-ul trebuie să conțină între 2 și 10 cifre.");

export const CaenCodeSchema = z.string()
  .regex(/^[0-9]{4}$/, "Codul CAEN trebuie să aibă exact 4 cifre.");

export const DecimalRonSchema = z.string()
  .regex(/^-?[0-9]{1,16}(\.[0-9]{1,2})?$/, "Valoarea trebuie să fie un decimal RON valid.");

export const CompanyFinancialSchema = z.object({
  fiscalYear: z.number().int().min(1990).max(2100),
  turnoverRon: DecimalRonSchema,
  netProfitRon: DecimalRonSchema,
  employeeCount: z.number().int().nonnegative(),
  sourceName: z.string().trim().min(3).max(160)
});

export const CompanySchema = z.object({
  id: z.string().uuid(),
  legalName: z.string().trim().min(2).max(240),
  displayName: z.string().trim().min(2).max(160),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/),
  cui: RomanianCuiSchema,
  regCom: z.string().trim().min(3).max(40).optional(),
  caenCode: CaenCodeSchema,
  caenActivity: z.string().trim().min(3).max(240),
  countyCode: RomanianCountyCodeSchema,
  locality: z.string().trim().min(2).max(120),
  registeredAddress: z.string().trim().min(5).max(320),
  logoPath: z.string().startsWith("/media/").optional(),
  status: z.enum(["active", "inactive", "insolvency"]),
  financials: z.array(CompanyFinancialSchema).min(1).max(10)
});

export type Company = z.infer<typeof CompanySchema>;
export type CompanyFinancial = z.infer<typeof CompanyFinancialSchema>;

export const CompanyDirectoryQuerySchema = z.object({
  q: z.string().trim().max(100).default(""),
  county: RomanianCountyCodeSchema.optional(),
  caen: CaenCodeSchema.optional(),
  sort: z.enum(["turnover", "employees", "name"]).default("turnover"),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12)
});

export type CompanyDirectoryQuery = z.infer<typeof CompanyDirectoryQuerySchema>;

const demoSource = "Date demonstrative pentru modelare; verificati sursa oficiala inainte de publicare";

export const companySeeds = CompanySchema.array().parse([
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee001",
    legalName: "OMV PETROM S.A.",
    displayName: "OMV Petrom",
    slug: "omv-petrom",
    cui: "1590082",
    regCom: "J40/8302/1997",
    caenCode: "0610",
    caenActivity: "Extracția petrolului brut",
    countyCode: "B",
    locality: "București",
    registeredAddress: "Str. Coralilor nr. 22, sector 1, București",
    logoPath: "/media/logos/5b48953e6075e_omv_petrom.jpeg",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "34690000000.00", netProfitRon: "3950000000.00", employeeCount: 7500, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "55930000000.00", netProfitRon: "10290000000.00", employeeCount: 7740, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee002",
    legalName: "AUTOMOBILE-DACIA S.A.",
    displayName: "Automobile Dacia",
    slug: "automobile-dacia",
    cui: "160796",
    regCom: "J03/81/1991",
    caenCode: "2910",
    caenActivity: "Fabricarea autovehiculelor de transport rutier",
    countyCode: "AG",
    locality: "Mioveni",
    registeredAddress: "Str. Uzinei nr. 1, Mioveni, județul Argeș",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "24700000000.00", netProfitRon: "1100000000.00", employeeCount: 14000, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "25700000000.00", netProfitRon: "527000000.00", employeeCount: 14120, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee003",
    legalName: "HIDROELECTRICA S.A.",
    displayName: "Hidroelectrica",
    slug: "hidroelectrica",
    cui: "13267221",
    regCom: "J40/7426/2000",
    caenCode: "3511",
    caenActivity: "Producția de energie electrică",
    countyCode: "B",
    locality: "București",
    registeredAddress: "Bd. Ion Mihalache nr. 15-17, sector 1, București",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "12000000000.00", netProfitRon: "6900000000.00", employeeCount: 3200, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "9120000000.00", netProfitRon: "4390000000.00", employeeCount: 3420, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee004",
    legalName: "S.N.G.N. ROMGAZ S.A.",
    displayName: "Romgaz",
    slug: "romgaz",
    cui: "14056826",
    regCom: "J32/392/2001",
    caenCode: "0620",
    caenActivity: "Extracția gazelor naturale",
    countyCode: "SB",
    locality: "Mediaș",
    registeredAddress: "Piața Constantin I. Motaș nr. 4, Mediaș, județul Sibiu",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "8300000000.00", netProfitRon: "2600000000.00", employeeCount: 5300, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "12850000000.00", netProfitRon: "2540000000.00", employeeCount: 5410, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee005",
    legalName: "DEDEMAN S.R.L.",
    displayName: "Dedeman",
    slug: "dedeman",
    cui: "2816464",
    regCom: "J04/2621/1992",
    caenCode: "4752",
    caenActivity: "Comerț cu amănuntul al articolelor de fierărie",
    countyCode: "BC",
    locality: "Bacău",
    registeredAddress: "Str. Alexei Tolstoi nr. 8, Bacău, județul Bacău",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "11500000000.00", netProfitRon: "1600000000.00", employeeCount: 13000, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "11050000000.00", netProfitRon: "1700000000.00", employeeCount: 12100, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee006",
    legalName: "DANTE INTERNATIONAL S.A.",
    displayName: "eMAG",
    slug: "emag",
    cui: "14399840",
    regCom: "J40/372/2002",
    caenCode: "4791",
    caenActivity: "Comerț cu amănuntul prin Internet",
    countyCode: "B",
    locality: "București",
    registeredAddress: "Șos. Virtuții nr. 148, sector 6, București",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "8000000000.00", netProfitRon: "120000000.00", employeeCount: 3000, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "7250000000.00", netProfitRon: "-180000000.00", employeeCount: 3150, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee007",
    legalName: "BITDEFENDER S.R.L.",
    displayName: "Bitdefender",
    slug: "bitdefender",
    cui: "18189442",
    regCom: "J40/20427/2005",
    caenCode: "6201",
    caenActivity: "Activități de realizare a soft-ului la comandă",
    countyCode: "B",
    locality: "București",
    registeredAddress: "Str. Orhideelor nr. 15A, sector 6, București",
    logoPath: "/media/logos/5c9b4e5fb2aa6_logo_bitdefender_red_white.png",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "1700000000.00", netProfitRon: "310000000.00", employeeCount: 1800, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "1420000000.00", netProfitRon: "245000000.00", employeeCount: 1650, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee008",
    legalName: "S.N.T.G.N. TRANSGAZ S.A.",
    displayName: "Transgaz",
    slug: "transgaz",
    cui: "13068733",
    regCom: "J32/301/2000",
    caenCode: "4950",
    caenActivity: "Transporturi prin conducte",
    countyCode: "MS",
    locality: "Târgu Mureș",
    registeredAddress: "Str. Gheorghe Dima nr. 4, Mediaș, județul Sibiu",
    status: "active",
    financials: [
      { fiscalYear: 2023, turnoverRon: "2500000000.00", netProfitRon: "600000000.00", employeeCount: 3100, sourceName: demoSource },
      { fiscalYear: 2022, turnoverRon: "1980000000.00", netProfitRon: "348000000.00", employeeCount: 3180, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee009",
    legalName: "SCHENKER LOGISTICS ROMANIA SA",
    displayName: "Schenker Logistics Romania",
    slug: "schenker-logistics-romania",
    cui: "5905159",
    regCom: "J40/12628/1994",
    caenCode: "5229",
    caenActivity: "Alte activități anexe transporturilor",
    countyCode: "B",
    locality: "Sector 5, București",
    registeredAddress: "Calea 13 Septembrie nr. 90, sector 5, București",
    status: "active",
    financials: [
      { fiscalYear: 2024, turnoverRon: "824639124.00", netProfitRon: "103633281.00", employeeCount: 870, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee010",
    legalName: "I.B. CARGO SRL",
    displayName: "I.B. Cargo",
    slug: "ib-cargo",
    cui: "23163759",
    regCom: "J23/273/2008",
    caenCode: "5229",
    caenActivity: "Servicii de transport rutier, aerian și maritim",
    countyCode: "IF",
    locality: "Voluntari",
    registeredAddress: "Bd. Pipera nr. 1/VI, Voluntari, județul Ilfov",
    logoPath: "/media/logos/5c37515e703e9_logo_ibcargo_300.jpg",
    status: "active",
    financials: [
      { fiscalYear: 2024, turnoverRon: "421423744.00", netProfitRon: "23991925.00", employeeCount: 144, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee011",
    legalName: "KLG EUROPE LOGISTICS SRL",
    displayName: "KLG Europe Logistics",
    slug: "klg-europe-logistics",
    cui: "16539363",
    regCom: "J52/418/2004",
    caenCode: "5229",
    caenActivity: "Servicii integrate în domeniul transportului și logisticii",
    countyCode: "GR",
    locality: "Bolintin-Deal",
    registeredAddress: "Str. I.C. Brătianu, km 23, Bolintin-Deal, județul Giurgiu",
    logoPath: "/media/logos/5bd32e2f2026a_klg_europe.jpg",
    status: "active",
    financials: [
      { fiscalYear: 2024, turnoverRon: "301895577.00", netProfitRon: "8710581.00", employeeCount: 283, sourceName: demoSource }
    ]
  },
  {
    id: "5afeb2e0-7b43-44df-8b99-0e95c00ee012",
    legalName: "DSV SOLUTIONS SRL",
    displayName: "DSV Solutions",
    slug: "dsv-solutions",
    cui: "5727108",
    regCom: "J23/1248/2002",
    caenCode: "5210",
    caenActivity: "Logistică - depozitare, distribuție și transport",
    countyCode: "IF",
    locality: "Dragomirești-Deal",
    registeredAddress: "Șos. de Centură nr. 13A, Dragomirești-Deal, județul Ilfov",
    logoPath: "/media/logos/company_logo_951.jpg",
    status: "active",
    financials: [
      { fiscalYear: 2024, turnoverRon: "190757137.00", netProfitRon: "8763888.00", employeeCount: 393, sourceName: demoSource }
    ]
  }
]);

export function getDistinctCaenOptions(): Array<{ code: string; activity: string }> {
  const seen = new Map<string, string>();
  for (const company of companySeeds) {
    if (!seen.has(company.caenCode)) {
      seen.set(company.caenCode, company.caenActivity);
    }
  }
  return Array.from(seen.entries())
    .map(([code, activity]) => ({ code, activity }))
    .sort((left, right) => left.code.localeCompare(right.code));
}

function matchesCompany(company: Company, query: CompanyDirectoryQuery): boolean {
  const normalized = query.q.toLocaleLowerCase("ro-RO");
  const haystack = [company.legalName, company.displayName, company.cui, company.caenCode, company.caenActivity, company.locality]
    .join(" ")
    .toLocaleLowerCase("ro-RO");

  return (!normalized || haystack.includes(normalized))
    && (!query.county || company.countyCode === query.county)
    && (!query.caen || company.caenCode === query.caen);
}

function newestFinancial(company: Company): CompanyFinancial {
  const financial = company.financials[0];
  if (!financial) {
    throw new Error(`Compania ${company.cui} nu are situații financiare.`);
  }
  return financial;
}

export function searchCompanies(input: unknown): { items: Company[]; total: number; page: number; pageSize: number } {
  const query = CompanyDirectoryQuerySchema.parse(input);
  const filtered = companySeeds.filter((company) => matchesCompany(company, query));
  const sorted = [...filtered].sort((left, right) => {
    if (query.sort === "name") return left.displayName.localeCompare(right.displayName, "ro-RO");
    if (query.sort === "employees") return newestFinancial(right).employeeCount - newestFinancial(left).employeeCount;
    return Number(newestFinancial(right).turnoverRon) - Number(newestFinancial(left).turnoverRon);
  });
  const start = (query.page - 1) * query.pageSize;
  return { items: sorted.slice(start, start + query.pageSize), total: sorted.length, page: query.page, pageSize: query.pageSize };
}

export function findCompanyByCui(input: unknown): Company | null {
  const cui = RomanianCuiSchema.parse(input);
  return companySeeds.find((company) => company.cui === cui) ?? null;
}

export function getCountyName(code: RomanianCountyCode): string {
  const county = romanianCounties.find((candidate) => candidate.code === code);
  if (!county) {
    throw new Error(`Județ necunoscut: ${code}`);
  }
  return county.name;
}
