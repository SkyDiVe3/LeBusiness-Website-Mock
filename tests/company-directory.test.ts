import { describe, expect, it } from "vitest";
import { CompanyDirectoryQuerySchema, RomanianCuiSchema, findCompanyByCui, searchCompanies } from "@doingbusiness/domain";

describe("company directory public seam", () => {
  it("finds a Romanian company using a real CUI", () => {
    const result = searchCompanies({ q: "1590082", sort: "turnover" });
    expect(result.total).toBe(1);
    expect(result.items[0]?.displayName).toBe("OMV Petrom");
    expect(result.items[0]?.countyCode).toBe("B");
  });

  it("filters by județ and keeps financial fields", () => {
    const result = searchCompanies({ county: "AG", sort: "name" });
    expect(result.total).toBe(1);
    expect(result.items[0]?.caenCode).toBe("2910");
    expect(result.items[0]?.financials[0]?.employeeCount).toBe(14000);
  });

  it("rejects malformed CUI and CAEN input at the schema seam", () => {
    expect(RomanianCuiSchema.safeParse("RO-1590082").success).toBe(false);
    expect(CompanyDirectoryQuerySchema.safeParse({ caen: "62A1" }).success).toBe(false);
    expect(findCompanyByCui("1590082")?.legalName).toBe("OMV PETROM S.A.");
  });
});
