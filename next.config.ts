import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Chapters live in content/docs and are imported by app/docs/[slug], so no MDX page extensions are needed.
const nextConfig: NextConfig = {};

// Plugins are referenced by name (not imported) so the options stay serializable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}], ["rehype-pretty-code", { theme: "github-dark", keepBackground: false }]],
  },
});

export default withMDX(nextConfig);
