import { MetadataRoute } from "next";
import { APP_URL } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard", "/profile", "/sign-in", "/sign-up"],
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
