import { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "www.gravatar.com",
      "cdn.pixabay.com",
      "themesflat.co",
      "encrypted-tbn0.gstatic.com",
      "esprit.vteximg.com.br",
      "w0.peakpx.com",
    ],
  },
};

export default withPlaiceholder(nextConfig);
