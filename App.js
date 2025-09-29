import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import {
  Appbar,
  Switch,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from "react-native-paper";
import Products from "./src/components/products";
import { SafeAreaProvider } from "react-native-safe-area-context";

function InnerApp() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const theme = isSwitchOn ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <ThemedApp
          isSwitchOn={isSwitchOn}
          onToggleSwitch={() => setIsSwitchOn(!isSwitchOn)}
        />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

function ThemedApp({ isSwitchOn, onToggleSwitch }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isSwitchOn ? "#000" : "#fff" }, 
      ]}
    >
      <Appbar.Header
        style={{
          backgroundColor: isSwitchOn ? "#000" : "#fff",
          elevation: 0,
        }}
      >
        <Appbar.Content
          title="BMW Showroom"
          titleStyle={{
            fontWeight: "bold",
            fontSize: 20,
            color: isSwitchOn ? "#fff" : "#000", 
          }}
        />
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </Appbar.Header>

      <Products isDark={isSwitchOn} />

      <StatusBar style={isSwitchOn ? "light" : "dark"} />
    </View>
  );
}

export default InnerApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
