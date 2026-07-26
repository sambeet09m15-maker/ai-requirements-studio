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
  "/api/public(.*)", // any public API routes
  "/api/demo-quality(.*)", // unauthenticated live demo on the homepage — no sign-up required
  "/api/feedback(.*)", // feedback widget — submitted by signed-out visitors too
  "/api/ratings-summary(.*)", // public rating average shown on the homepage
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
