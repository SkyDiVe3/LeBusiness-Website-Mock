"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CompanySchema, romanianCounties, type Company } from "@doingbusiness/domain";
import { z } from "zod";
import { CompanyCard } from "./company-card";

type DirectoryResponse = { items: Company[]; total: number; page: number; pageSize: number };
type QueryState = { q: string; county: string; caen: string; sort: string };

const emptyQuery: QueryState = { q: "", county: "", caen: "", sort: "turnover" };

const CompanyDirectoryResponseSchema = z.object({
  items: z.array(CompanySchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number()
});

function buildSearchParams(query: QueryState): URLSearchParams {
  const parameters = new URLSearchParams();
  if (query.q.trim()) parameters.set("q", query.q.trim());
  if (query.county) parameters.set("county", query.county);
  if (query.caen) parameters.set("caen", query.caen);
  if (query.sort && query.sort !== "turnover") parameters.set("sort", query.sort);
  return parameters;
}

export function CompanyDirectory({
  initialResult,
  caenOptions
}: Readonly<{
  initialResult: DirectoryResponse;
  caenOptions: ReadonlyArray<{ code: string; activity: string }>;
}>) {
  const [query, setQuery] = useState<QueryState>(emptyQuery);
  const [result, setResult] = useState<DirectoryResponse>(initialResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const urlQ = currentParams.get("q") ?? "";
    const urlCounty = currentParams.get("county") ?? "";
    const urlCaen = currentParams.get("caen") ?? "";
    const urlSort = currentParams.get("sort") ?? "turnover";

    if (urlQ || urlCounty || urlCaen || urlSort !== "turnover") {
      setQuery({ q: urlQ, county: urlCounty, caen: urlCaen, sort: urlSort });
    }
    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;

    const urlParams = buildSearchParams(query);
    const searchSuffix = urlParams.toString();
    const targetHref = searchSuffix ? `/companii?${searchSuffix}` : "/companii";
    window.history.replaceState(null, "", targetHref);

    const apiParams = new URLSearchParams(urlParams);
    apiParams.set("sort", query.sort || "turnover");

    const controller = new AbortController();
    setLoading(true);

    void fetch(`/api/companies?${apiParams.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        const body: unknown = await response.json();
        if (!response.ok) throw new Error("Nu am putut filtra directorul cu parametrii selectati.");
        return body;
      })
      .then((body: unknown) => {
        const parsed = CompanyDirectoryResponseSchema.safeParse(body);
        if (!parsed.success) throw new Error("Raspuns invalid din server.");
        setResult(parsed.data);
        setError(null);
        setLoading(false);
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === "AbortError") return;
        setError(reason instanceof Error ? reason.message : "A aparut o eroare la incarcare.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  function resetFilters(): void {
    setQuery(emptyQuery);
  }

  const countLabel =
    result.total === 1 ? "1 companie găsită" : `${result.total} companii găsite`;

  return (
    <>
      <form className="directory-bar" onSubmit={onSubmit}>
        <div className="field-group">
          <label className="field-label" htmlFor="company-search">
            Caută după nume, CUI sau CAEN
          </label>
          <input
            id="company-search"
            className="field"
            placeholder="Ex: OMV Petrom, 1590082"
            value={query.q}
            onChange={(event) => setQuery({ ...query, q: event.target.value })}
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="county">
            Județ
          </label>
          <select
            id="county"
            className="field"
            value={query.county}
            onChange={(event) => setQuery({ ...query, county: event.target.value })}
          >
            <option value="">Toate județele</option>
            {romanianCounties.map((county) => (
              <option value={county.code} key={county.code}>
                {county.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="caen">
            Cod CAEN
          </label>
          <select
            id="caen"
            className="field"
            value={query.caen}
            onChange={(event) => setQuery({ ...query, caen: event.target.value })}
          >
            <option value="">Toate activitățile CAEN</option>
            {caenOptions.map((option) => (
              <option value={option.code} key={option.code}>
                {option.code} · {option.activity}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="sort">
            Sortare
          </label>
          <select
            id="sort"
            className="field"
            value={query.sort}
            onChange={(event) => setQuery({ ...query, sort: event.target.value })}
          >
            <option value="turnover">Cifră de afaceri</option>
            <option value="employees">Număr angajați</option>
            <option value="name">Nume companie</option>
          </select>
        </div>

        <button className="button button-primary" type="submit">
          Aplică
        </button>
      </form>

      {error ? (
        <p role="alert" className="notice notice-error">
          {error}
        </p>
      ) : null}

      <div className="directory-summary">
        <span className="mono">{loading ? "Se actualizează rezultatele..." : countLabel}</span>
        {query.q || query.county || query.caen ? (
          <button type="button" className="button button-outline" onClick={resetFilters}>
            Resetează filtrele
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className="company-grid" aria-busy="true" aria-label="Se încarcă companiile">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      ) : result.items.length === 0 ? (
        <div className="empty-state">
          <h3>Nicio companie nu corespunde filtrelor selectate</h3>
          <p>Încearcă un alt CUI, un județ diferit sau resetează toate filtrele active.</p>
          <button type="button" className="button button-primary" onClick={resetFilters}>
            Afișează toate companiile
          </button>
        </div>
      ) : (
        <div className="company-grid">
          {result.items.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </>
  );
}
