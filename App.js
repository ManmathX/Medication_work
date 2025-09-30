import * as React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import Video from 'react-native-video';
import { merge } from 'deepmerge';


import Products from './src/components/products';
import CarDetails from './src/components/CarDeils';

const Stack = createStackNavigator();

const CombinedDefaultTheme = merge(MD3LightTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, NavigationDarkTheme);

export const ThemeContext = React.createContext();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Products">
            <Stack.Screen
              name="Products"
              component={Products}
              options={{ title: 'BMW Showroom' }}
            />
            <Stack.Screen
              name="CarDetails"
              component={CarDetails}
              options={{ title: 'Car Blog' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
