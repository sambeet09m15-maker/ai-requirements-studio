import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", // landing page — public
  "/sign-in(.*)", // sign in pages — public
  "/sign-up(.*)", // sign up pages — public
  "/concept-map(.*)", // knowledge tools — public for SEO
  "/requirement-autopsy(.*)",
  "/situation-guide(.*)",
  "/privacy(.*)", // legal pages — public
  "/terms(.*)",
  "/refund(.*)",
  "/api/public(.*)", // any public API routes
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
