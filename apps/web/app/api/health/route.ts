import { readRuntimeEnvironment } from "@doingbusiness/config";
import { NextResponse } from "next/server";

export function GET(): NextResponse {
  const environment = readRuntimeEnvironment({ NODE_ENV: process.env["NODE_ENV"], NEXT_PUBLIC_SITE_URL: process.env["NEXT_PUBLIC_SITE_URL"] });
  return NextResponse.json({ status: "ok", environment: environment.NODE_ENV });
}
