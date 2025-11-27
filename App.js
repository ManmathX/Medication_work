import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';
import * as React from 'react';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
// import { StatusBar } from 'expo-status-bar'; // not using this right now
import AppNavigator from './src/navigation/AppNavigator';

const CombinedLightTheme = merge(MD3LightTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, NavigationDarkTheme);

export const ThemeContext = React.createContext({ isDarkTheme: false, toggleTheme: () => { } });

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const themeContextValue = React.useMemo(() => ({
    isDarkTheme,
    toggleTheme
  }), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
