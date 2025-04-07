export default function robots() {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"]
    }],
    sitemap: "https://denttitanyum.com/sitemap.xml"
  }
}
