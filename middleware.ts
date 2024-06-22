import { NextRequest, NextResponse } from "next/server";
import ReadSiteDomain from "./utils/actions/sites/read-site-domain";

// Main middleware function
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Get hostname (e.g., 'mike.com', 'test.mike.com')
  const hostname = req.headers.get("host");

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    // In production, use the custom base domain from environment variables
    const baseDomain = process.env.BASE_DOMAIN;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    // In development, handle localhost case
    currentHost = hostname?.replace(`localhost:3000`, "");
    // currentHost = hostname?.replace(`.localhost:3000`, "");
  }
  console.log({
    url,
    pathname,
    hostname,
    currentHost,
    node_env: process.env.NODE_ENV,
  });
  // If there's no currentHost, likely accessing the root domain, handle accordingly
  if (!currentHost) {
    // Continue to the next middleware or serve the root content
    return NextResponse.next();
  }

  // Fetch tenant-specific data based on the subdomain
  const { data } = await ReadSiteDomain(currentHost);

  // Handle the case where no subdomain data is found
  if (!data) {
    // Continue to the next middleware or serve the root content
    return NextResponse.next();
  }

  const site_id = data.site_id;
  // Get the tenant's subdomain from the response
  const tenantSubdomain = data.site_subdomain;
  console.log({ tenantSubdomain });

  if (tenantSubdomain) {
    return NextResponse.rewrite(new URL(`/${site_id}${pathname}`, req.url));
  }

  // Rewrite the URL to the tenant-specific path
  //   return NextResponse.rewrite(
  //     new URL(tenantSubdomain === "/" ? "" : `tsafi.xyz`, req.url)
  //   );
  return NextResponse.next();
}

// Define which paths the middleware should run for
export const config = {
  //   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc|graphql)(.*)"],
};
