import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get KYC completion status from cookies
  const kycCompleted = request.cookies.get("kycCompleted")?.value === "true";

  // Get wallet address
  const hasWallet = request.cookies.get("wallet")?.value;

  // If user tries to access /, redirect based on their status
  if (pathname === "/") {
    if (hasWallet && kycCompleted) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/kyc", request.url));
    }
  }

  // If user tries to access /dashboard without being onboarded, redirect to /kyc
  if (pathname === "/dashboard") {
    if (!kycCompleted) {
      return NextResponse.redirect(new URL("/kyc", request.url));
    }
  }

  // If user is already onboarded and tries to access /kyc, redirect to /dashboard
  if (pathname === "/kyc") {
    if (kycCompleted) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/kyc"],
};
