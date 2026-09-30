import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    return NextResponse.redirect(url, 308)
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next|.*opengraph-image|.*\\..*).*)"],
}
