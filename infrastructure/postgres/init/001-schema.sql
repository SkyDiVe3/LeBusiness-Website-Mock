CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY,
  legal_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  cui VARCHAR(10) NOT NULL UNIQUE,
  caen_code CHAR(4) NOT NULL,
  county_code CHAR(2) NOT NULL,
  locality TEXT NOT NULL,
  registered_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS company_financials (
  id UUID PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  fiscal_year SMALLINT NOT NULL CHECK (fiscal_year BETWEEN 1990 AND 2100),
  turnover_ron NUMERIC(18, 2) NOT NULL,
  net_profit_ron NUMERIC(18, 2) NOT NULL,
  employee_count INTEGER NOT NULL CHECK (employee_count >= 0),
  source_name TEXT NOT NULL,
  UNIQUE(company_id, fiscal_year)
);

CREATE INDEX IF NOT EXISTS companies_county_caen_idx ON companies(county_code, caen_code);
CREATE INDEX IF NOT EXISTS company_financials_year_turnover_idx ON company_financials(fiscal_year DESC, turnover_ron DESC);

CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('news', 'article', 'interview', 'event')),
  locale CHAR(2) NOT NULL CHECK (locale IN ('ro', 'en')),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body_markdown TEXT NOT NULL DEFAULT '',
  author_name TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  source_url TEXT,
  UNIQUE(locale, kind, slug)
);

CREATE TABLE IF NOT EXISTS legacy_routes (
  source_path TEXT PRIMARY KEY,
  canonical_path TEXT,
  disposition TEXT NOT NULL CHECK (disposition IN ('render', 'redirect', 'excluded', 'failed')),
  source_checksum CHAR(64),
  imported_at TIMESTAMPTZ,
  failure_reason TEXT
);
