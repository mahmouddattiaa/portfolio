import { NextResponse, type NextRequest } from "next/server";

/**
 * Renamed from `middleware.ts` to `proxy.ts` for Next.js 16 forward
 * compatibility — the `middleware` file convention is deprecated.
 *
 * Sets the `x-kepler-locale` request header so the root layout can flip
 * `lang` and `dir` to match the URL.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-kepler-locale",
    request.nextUrl.pathname === "/ar" ||
      request.nextUrl.pathname.startsWith("/ar/")
      ? "ar"
      : "en",
  );
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
