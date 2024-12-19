import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Assuming JWT stored in cookies
  const role = req.cookies.get("role")?.value; // User role stored in cookies

  const dashboardRoutes = [
    "/dashboard",
    "/dashboard/user",
    "/dashboard/admin",
    "/dashboard/trainer",
  ];

  // Redirect to login if no token and trying to access dashboard
  if (
    !token &&
    dashboardRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based redirection for default dashboard route
  if (req.nextUrl.pathname === "/dashboard") {
    if (role === "user")
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    if (role === "admin")
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    if (role === "trainer")
      return NextResponse.redirect(new URL("/dashboard/trainer", req.url));
  }

  // Restrict access to dashboard pages based on roles
  if (req.nextUrl.pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/user") && role !== "user") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (
    req.nextUrl.pathname.startsWith("/dashboard/trainer") &&
    role !== "trainer"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}
