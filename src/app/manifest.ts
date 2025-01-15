import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "tracker",
    short_name: "tracker",
    description: "contribution chart for every day tasks",
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
