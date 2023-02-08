import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: {
      700: "#8464c6",
      //700: "#8464c6",
    },
    secondary: {
      700: "#FEBD2F",
      //700: "#FF0000",
    },
    green: {
      700: "#00875F",
      500: "#00B37E",
      300: "#54ba6b",
    },
    gray: {
      700: "#121214",
      600: "#202024",
      500: "#29292E",
      400: "#323238",
      300: "#7C7C8A",
      200: "#C4C4CC",
      100: "#E1E1E6",
    },
    white: "#FFFFFF",
  },
  fonts: {
    heading: "Roboto_700Bold",
    body: "Roboto_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
