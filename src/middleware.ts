import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const pathArray = pathname.split("/");
  const slug = pathArray.pop();
  if (!slug) {
    return NextResponse.redirect(`https://www.askclio.com/`);
  }
  if (slug === "e") {
    return NextResponse.redirect(`https://www.askclio.com/earn`);
  }
  const slugFetch = await fetch(`${origin}/api/get-url/${slug}`);
  if (slugFetch.status !== 200) {
    return NextResponse.redirect(`https://www.askclio.com/earn`);
  }
  const data = await slugFetch.json();
  return NextResponse.redirect(
    `https://www.askclio.com/join-waitlist?ref=${data.value}`
  );
}

export const config = { matcher: ["/", "/:slug"] };
