import { romanianCounties } from "@doingbusiness/domain";
import { NextResponse } from "next/server";

export function GET(): NextResponse {
  const siteUrl = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010").replace(/\/+$/, "");

  const spec = {
    openapi: "3.1.0",
    info: {
      title: "DoingBusiness.ro Public API",
      version: "1.0.0",
      description: "Read-only Romanian company directory search, editorial metadata, service health, and validated contact intake."
    },
    servers: [{ url: siteUrl }],
    paths: {
      "/api/health": {
        get: {
          summary: "Service health status",
          responses: {
            "200": {
              description: "Healthy application status"
            }
          }
        }
      },
      "/api/companies": {
        get: {
          summary: "Search Romanian companies by CUI, name, CAEN, or county",
          parameters: [
            { name: "q", in: "query", schema: { type: "string", maxLength: 100 }, description: "Company name, CUI, CAEN code, or locality" },
            { name: "county", in: "query", schema: { type: "string", enum: romanianCounties.map((c) => c.code) }, description: "Romanian county (judet) code" },
            { name: "caen", in: "query", schema: { type: "string", pattern: "^[0-9]{4}$" }, description: "Four-digit CAEN code" },
            { name: "sort", in: "query", schema: { type: "string", enum: ["turnover", "employees", "name"], default: "turnover" } },
            { name: "page", in: "query", schema: { type: "integer", minimum: 1, maximum: 1000, default: 1 } },
            { name: "pageSize", in: "query", schema: { type: "integer", minimum: 1, maximum: 50, default: 12 } }
          ],
          responses: {
            "200": { description: "Validated paginated list of companies" },
            "400": { description: "Invalid filter parameters" }
          }
        }
      },
      "/api/contact": {
        post: {
          summary: "Submit validated editorial or partnership inquiry",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "message"],
                  properties: {
                    name: { type: "string", minLength: 2, maxLength: 120 },
                    email: { type: "string", format: "email", maxLength: 254 },
                    message: { type: "string", minLength: 10, maxLength: 4000 }
                  }
                }
              }
            }
          },
          responses: {
            "202": { description: "Contact inquiry accepted" },
            "400": { description: "Validation failed" }
          }
        }
      }
    }
  };

  return NextResponse.json(spec, {
    headers: {
      "Cache-Control": "public, max-age=300"
    }
  });
}
