import { NextRequest, NextResponse } from "next/server";


export function middleware(request) {
    return NextResponse.redirect(new URL('/login', request.url));
}

// Tentukan rute mana saja yang ingin diproteksi
export const config = {
  matcher: ["/admin/:path*"], // Semua halaman di dalam /admin/ akan diproteksi
};