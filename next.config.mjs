// next.config.mjs
import createMDX from '@next/mdx'

const withMDX = createMDX({
  // allow importing .mdx as pages/components
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MDX in the App Router works with the MDX plugin;
  // pageExtensions is harmless (affects /pages only).
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true, // Next's fast MDX compiler
  },
}

export default withMDX(nextConfig)
