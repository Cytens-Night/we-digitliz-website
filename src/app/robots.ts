import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/invoice", "/__forms.html", "/laptop-card"] }, sitemap: "https://wedigitlize.com/sitemap.xml" }; }
