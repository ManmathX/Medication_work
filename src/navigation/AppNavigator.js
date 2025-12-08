import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { ThemeContext } from '../../App';
import AccountScreen from '../screens/AccountScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainTabs = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Home', focusedIcon: 'home' },
        { key: 'chatbot', title: 'AI Chat', focusedIcon: 'robot' },
        { key: 'contact', title: 'Contact', focusedIcon: 'phone' },
        { key: 'account', title: 'Account', focusedIcon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: () => <HomeScreen navigation={navigation} isDarkTheme={isDarkTheme} onThemeToggle={toggleTheme} />,
        chatbot: () => <ChatBotScreen navigation={navigation} />,
        contact: () => <ContactScreen navigation={navigation} />,
        account: () => <AccountScreen navigation={navigation} />,
    });

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                safeAreaInsets={{ bottom: Platform.OS === 'android' ? 0 : undefined }}
            />
        </SafeAreaView>
    );
};

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="CarDetails" component={CarDetailsScreen} options={{ title: 'Car Details' }} />
            <Stack.Screen
                name="SignIn"
                component={require('../screens/SignInScreen').default}
                options={{ title: 'Sign In' }}
            />
            <Stack.Screen
                name="CreateAccount"
                component={require('../screens/CreateAccountScreen').default}
                options={{ title: 'Create Account' }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default AppNavigator;
