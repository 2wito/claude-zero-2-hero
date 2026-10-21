import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Plugins are referenced by name (not imported) so the options stay serializable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}], ["rehype-pretty-code", { theme: "github-dark", keepBackground: false }]],
  },
});

export default withMDX(nextConfig);
