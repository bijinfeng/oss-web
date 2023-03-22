import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const ENV = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isDev = ENV.NODE_ENV === "development";

  return defineConfig({
    base: isDev ? "/" : "/oss-web/",
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            injectScript: `<script type="module" src="./prefetch.js"></script>`,
          },
        },
      }),
    ],
    build: {
      target: "esnext",
    },
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  });
};
