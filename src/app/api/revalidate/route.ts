import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Secret token — change this to a secure random string in production
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "3g-revalidate-2026-secret";

// Allowed origins for CORS (admin panel URLs)
const ALLOWED_ORIGINS = [
  "https://newbackup3gnewnex.vercel.app",
  "https://new3gadmin.vercel.app",
  "https://app-mr08y460f-amgdigital-solutions-3134s-projects.vercel.app",
  "https://3guae.com",
  "https://www.3guae.com",
  "http://localhost:3000",
  "http://localhost:5173",
];

const VALID_PATHS = [
  "/", "/properties", "/blog", "/communities", "/developers",
  "/about", "/golden-visa", "/property-management", "/compare",
];

// CORS helper
function corsResponse(response: NextResponse, origin: string) {
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
}

/**
 * POST /api/revalidate
 * Body: { secret: string, path: string }
 * CORS-enabled for admin panel access
 */
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.find(o => origin.includes(o)) || "*";

  try {
    const body = await request.json();
    const { secret, path, slug, type } = body;

    // Validate secret
    if (!secret || secret !== REVALIDATE_SECRET) {
      return corsResponse(
        NextResponse.json(
          { success: false, message: "Invalid or missing secret token" },
          { status: 401 }
        ),
        allowedOrigin
      );
    }

    // Build path from type+slug if needed
    let targetPath = path;
    if (!targetPath && type && slug) {
      switch (type) {
        case "property": targetPath = `/property/${slug}`; break;
        case "blog": targetPath = `/${slug}`; break;
        case "community": targetPath = `/community/${slug}`; break;
        default:
          return corsResponse(
            NextResponse.json({ success: false, message: `Unknown type: ${type}` }, { status: 400 }),
            allowedOrigin
          );
      }
    }

    if (!targetPath) {
      return corsResponse(
        NextResponse.json({ success: false, message: "Missing 'path' or 'type+slug'" }, { status: 400 }),
        allowedOrigin
      );
    }

    // Revalidate
    revalidatePath(targetPath);
    const revalidatedPaths = [targetPath];

    // Auto-revalidate parent pages
    if (type === "property" || targetPath.includes("/property/")) {
      revalidatePath("/properties"); revalidatedPaths.push("/properties");
      revalidatePath("/"); revalidatedPaths.push("/");
    }
    if (type === "blog" || (!targetPath.startsWith("/property/") && !targetPath.startsWith("/community/") && targetPath !== "/")) {
      revalidatePath("/blog"); revalidatedPaths.push("/blog");
    }
    if (type === "community" || targetPath.includes("/community/")) {
      revalidatePath("/communities"); revalidatedPaths.push("/communities");
    }

    return corsResponse(
      NextResponse.json({
        success: true,
        message: `Revalidated: ${revalidatedPaths.join(", ")}`,
        revalidated: revalidatedPaths,
        timestamp: new Date().toISOString(),
      }),
      allowedOrigin
    );

  } catch (error: any) {
    console.error("[Revalidate API] Error:", error);
    return corsResponse(
      NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 }),
      allowedOrigin
    );
  }
}

/**
 * GET /api/revalidate — API info
 */
export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.find(o => origin.includes(o)) || "*";
  return corsResponse(
    NextResponse.json({
      name: "3G Revalidation API",
      description: "Invalidate Next.js ISR cache after content changes",
      method: "POST",
      body: { secret: "required — your revalidation secret", path: "optional — direct path", type: "optional — property|blog|community", slug: "optional — content slug" },
      note: "Provide either 'path' OR 'type+slug'",
      validPaths: VALID_PATHS,
    }),
    allowedOrigin
  );
}

/**
 * OPTIONS /api/revalidate — CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.find(o => origin.includes(o)) || "*";
  return corsResponse(new NextResponse(null, { status: 204 }), allowedOrigin);
}
