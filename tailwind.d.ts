import type { DefaultColors } from "tailwindcss/types/generated/colors";

declare module "tailwindcss/types/config" {
  interface ColorsConfig {
    chart: {
      "1": string;
      "2": string;
      "3": string;
      "4": string;
      "5": string;
    };
  }
}

declare module "tailwindcss/types/plugin" {
  interface Config {
    theme: {
      colors: DefaultColors & {
        chart: {
          "1": string;
          "2": string;
          "3": string;
          "4": string;
          "5": string;
        };
      };
    };
  }
}