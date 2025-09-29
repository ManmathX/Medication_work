import { registerRootComponent } from "expo";
import * as React from "react";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import App from "./App";

// Light theme
const themeLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#663399",
  },
};

const themeDark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#e64a19",
  },
};

function Main() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <PaperProvider theme={isSwitchOn ? themeDark : themeLight}>
      <App isSwitchOn={isSwitchOn} onToggleSwitch={onToggleSwitch} />
    </PaperProvider>
  );
}

// Register Main as the root for Expo
registerRootComponent(Main);
