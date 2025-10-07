// lib/mdx.ts
import rehypePrettyCode from "rehype-pretty-code";

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: "github-dark",            // or "one-dark-pro", "nord", etc.
        keepBackground: false,
      }],
    ],
  },
};
