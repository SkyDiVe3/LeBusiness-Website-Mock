INSERT INTO companies (id, legal_name, display_name, cui, caen_code, county_code, locality, registered_address, status) VALUES
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee001', 'OMV PETROM S.A.', 'OMV Petrom', '1590082', '0610', 'B', 'București', 'Str. Coralilor nr. 22, sector 1, București', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee002', 'AUTOMOBILE-DACIA S.A.', 'Automobile Dacia', '160796', '2910', 'AG', 'Mioveni', 'Str. Uzinei nr. 1, Mioveni, județul Argeș', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee003', 'HIDROELECTRICA S.A.', 'Hidroelectrica', '13267221', '3511', 'B', 'București', 'Bd. Ion Mihalache nr. 15-17, sector 1, București', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee004', 'S.N.G.N. ROMGAZ S.A.', 'Romgaz', '14056826', '0620', 'SB', 'Mediaș', 'Piața Constantin I. Motaș nr. 4, Mediaș, județul Sibiu', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee005', 'DEDEMAN S.R.L.', 'Dedeman', '2816464', '4752', 'BC', 'Bacău', 'Str. Alexei Tolstoi nr. 8, Bacău, județul Bacău', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee006', 'DANTE INTERNATIONAL S.A.', 'eMAG', '14399840', '4791', 'B', 'București', 'Șos. Virtuții nr. 148, sector 6, București', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee007', 'BITDEFENDER S.R.L.', 'Bitdefender', '18189442', '6201', 'B', 'București', 'Str. Orhideelor nr. 15A, sector 6, București', 'active'),
  ('5afeb2e0-7b43-44df-8b99-0e95c00ee008', 'S.N.T.G.N. TRANSGAZ S.A.', 'Transgaz', '13068733', '4950', 'MS', 'Târgu Mureș', 'Str. Gheorghe Dima nr. 4, Mediaș, județul Sibiu', 'active')
ON CONFLICT (cui) DO NOTHING;

INSERT INTO company_financials (id, company_id, fiscal_year, turnover_ron, net_profit_ron, employee_count, source_name) VALUES
  ('f9d4ea78-3f05-4b79-a670-000000000001', '5afeb2e0-7b43-44df-8b99-0e95c00ee001', 2023, 34690000000.00, 3950000000.00, 7500, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000002', '5afeb2e0-7b43-44df-8b99-0e95c00ee002', 2023, 24700000000.00, 1100000000.00, 14000, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000003', '5afeb2e0-7b43-44df-8b99-0e95c00ee003', 2023, 12000000000.00, 6900000000.00, 3200, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000004', '5afeb2e0-7b43-44df-8b99-0e95c00ee004', 2023, 8300000000.00, 2600000000.00, 5300, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000005', '5afeb2e0-7b43-44df-8b99-0e95c00ee005', 2023, 11500000000.00, 1600000000.00, 13000, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000006', '5afeb2e0-7b43-44df-8b99-0e95c00ee006', 2023, 8000000000.00, 120000000.00, 3000, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000007', '5afeb2e0-7b43-44df-8b99-0e95c00ee007', 2023, 1700000000.00, 310000000.00, 1800, 'Seed demonstrativ — verificare financiară necesară înainte de publicare'),
  ('f9d4ea78-3f05-4b79-a670-000000000008', '5afeb2e0-7b43-44df-8b99-0e95c00ee008', 2023, 2500000000.00, 600000000.00, 3100, 'Seed demonstrativ — verificare financiară necesară înainte de publicare')
ON CONFLICT (company_id, fiscal_year) DO NOTHING;
