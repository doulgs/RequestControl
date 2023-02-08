import React from "react";
import { THEME } from "./src/styles/theme";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
