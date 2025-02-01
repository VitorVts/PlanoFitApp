import React, { useMemo } from "react";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from "react-native";
import Home from "./src/screens/Home";
import { fontSizes } from "./src/utils/fontSizes"; // Importe os tamanhos de fontes

const lightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#27AE60",
    onPrimary: "#FFFFFF",
    secondary: "#3498DB",
    onSecondary: "#FFFFFF",
    success: "#A3CB38",
    onSuccess: "#FFFFFF",
    error: "#E74C3C",
    onError: "#FFFFFF",
    warning: "#F1C40F",
    onWarning: "#000000",
  },
  fonts: {
    ...MD3LightTheme.fonts,
    regular: {
      fontFamily: "Roboto",
      fontSize: fontSizes.medium,
    },
    medium: {
      fontFamily: "Roboto",
      fontSize: fontSizes.large,
    },
    large: {
      fontFamily: "Roboto",
      fontSize: fontSizes.xLarge,
    },
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#2ECC71",
    onPrimary: "#FFFFFF",
    secondary: "#2980B9",
    onSecondary: "#FFFFFF",
    success: "#16A085",
    onSuccess: "#FFFFFF",
    error: "#E74C3C",
    onError: "#FFFFFF",
    warning: "#F39C12",
    onWarning: "#FFFFFF",
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    regular: {
      fontFamily: "Roboto",
      fontSize: fontSizes.medium,
    },
    medium: {
      fontFamily: "Roboto",
      fontSize: fontSizes.large,
    },
    large: {
      fontFamily: "Roboto",
      fontSize: fontSizes.xLarge,
    },
  },
};

export default function App() {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () => (colorScheme === "dark" ? darkTheme : lightTheme),
    [colorScheme]
  );

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Home />
      </PaperProvider>
    </QueryClientProvider>
  );
}