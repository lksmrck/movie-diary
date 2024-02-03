import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

const path = require("path");
import tailwindcss from "tailwindcss";

const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ""
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv
  .map((arg) => arg.match(/--name=(?<value>.+)/i))
  .filter(Boolean)[0];
const certificateName = certificateArg
  ? certificateArg.groups.value
  : process.env.npm_package_name;

if (!certificateName) {
  console.error(
    "Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly."
  );
  process.exit(-1);
}

export const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
export const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

export default defineConfig({
  build: {
    outDir: "../wwwroot",
  },
  server: {
    port: 44460,
    https: {
      key: keyFilePath,
      cert: certFilePath,
    },
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
  plugins: [react(), mkcert()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
