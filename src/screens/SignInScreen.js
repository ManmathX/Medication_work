import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';

const SignInScreen = ({ navigation }) => {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        // TODO: call API
        console.log('Signing in:', email);
        setTimeout(() => {
            setLoading(false);
            alert('Sign in feature coming soon!');
        }, 1000);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Surface style={styles.surface} elevation={2}>
                <Text variant="headlineMedium" style={styles.title}>Sign In</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>Welcome back to BMW Showroom</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    style={styles.input}
                    secureTextEntry
                />

                <Button
                    mode="contained"
                    onPress={handleSignIn}
                    loading={loading}
                    style={styles.button}
                >
                    Sign In
                </Button>

                <Button
                    mode="text"
                    onPress={() => navigation.navigate('CreateAccount')}
                    style={styles.linkButton}
                >
                    Don't have an account? Create one
                </Button>
            </Surface>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    surface: { padding: 24, borderRadius: 12 },
    title: { marginBottom: 8, fontWeight: 'bold', textAlign: 'center' },
    subtitle: { marginBottom: 24, textAlign: 'center', opacity: 0.7 },
    input: { marginBottom: 16 },
    button: { marginTop: 8 },
    linkButton: { marginTop: 12 },
});

export default SignInScreen;
