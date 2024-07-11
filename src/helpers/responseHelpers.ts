import { NextResponse } from "next/server";

export function createResponse(ok: boolean, message: string, status: number = 200, data?: any): NextResponse {
  const body = { ok, message, data };
  return NextResponse.json(body, { status });
}
