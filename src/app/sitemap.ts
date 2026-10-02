import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/projects", "/card", "/privacy-policy", "/terms", "/cookies"].map(path => ({ url: `https://wedigitlize.com${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : path === "/projects" ? .9 : .6 })); }
