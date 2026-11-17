---
title: Domain Schema
status: active
tags:
  - doingbusiness
  - schema
  - data
updated: 2026-11-16
related:
  - "[[Architecture]]"
  - "[[Import and Legacy Routes]]"
  - "[[Test Strategy]]"
---

# Domain schema

The company directory models Romanian business entities. Each company record stores legal name, display name, CUI, four-digit CAEN code and activity label, county code (`judet`), locality, registered address, legal status, optional local logo path, and annual financial snapshots.

> [!info] Validation rule
> Every external value crosses a Zod parser before entering application logic. TypeScript types are inferred directly from schemas with zero `as` assertions.

## Company fields

| Field | Meaning | Validation |
| --- | --- | --- |
| `cui` | Cod Unic de Inregistrare / CIF | 2 to 10 numeric digits |
| `caenCode` | Four-digit CAEN activity code | Exact 4 digits |
| `countyCode` | Romanian judet code | Closed 42-code enum including `B` |
| `turnoverRon` | Annual turnover | Exact signed decimal string in domain, `NUMERIC` in PostgreSQL |
| `netProfitRon` | Annual net profit or loss | Exact signed decimal string in domain, `NUMERIC` in PostgreSQL |
| `employeeCount` | Annual employee headcount | Non-negative integer |

`CompanySchema`, `CompanyFinancialSchema`, `CompanyDirectoryQuerySchema`, and SQL constraints enforce identical boundaries. All current financial rows are demonstrative seed data and carry a disclaimer label. See [[Security and Privacy]] for publication limits and [[Test Strategy]] for schema test coverage.
