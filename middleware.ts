import { NextResponse, type NextRequest } from "next/server"
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "@/lib/i18n"

/**
 * French is served without prefix, English under /en.
 * An explicit prefix always wins; unprefixed URLs follow the language remembered in LOCALE_COOKIE.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    const response = NextResponse.redirect(url, 307)
    response.cookies.set(LOCALE_COOKIE, "fr", { path: "/", maxAge: LOCALE_COOKIE_MAX_AGE, sameSite: "lax" })
    return response
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  if (request.cookies.get(LOCALE_COOKIE)?.value === "en") {
    url.pathname = `/en${pathname === "/" ? "" : pathname}`
    return NextResponse.redirect(url, 307)
  }

  url.pathname = `/fr${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next|.*opengraph-image|.*\\..*).*)"],
}
