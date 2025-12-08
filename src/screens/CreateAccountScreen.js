import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';

const CreateAccountScreen = ({ navigation }) => {
    const theme = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setLoading(true);
        // TODO: call API
        console.log('Creating account:', email);
        setTimeout(() => {
            setLoading(false);
            alert('Account creation feature coming soon!');
        }, 1000);
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
            <Surface style={styles.surface} elevation={2}>
                <Text variant="headlineMedium" style={styles.title}>Create Account</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>Join the BMW Showroom family</Text>

                <TextInput
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                />

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

                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    mode="outlined"
                    style={styles.input}
                    secureTextEntry
                />

                <Button
                    mode="contained"
                    onPress={handleCreateAccount}
                    loading={loading}
                    style={styles.button}
                >
                    Create Account
                </Button>

                <Button
                    mode="text"
                    onPress={() => navigation.goBack()}
                    style={styles.linkButton}
                >
                    Already have an account? Sign in
                </Button>
            </Surface>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20, justifyContent: 'center' },
    surface: { padding: 24, borderRadius: 12 },
    title: { marginBottom: 8, fontWeight: 'bold', textAlign: 'center' },
    subtitle: { marginBottom: 24, textAlign: 'center', opacity: 0.7 },
    input: { marginBottom: 16 },
    button: { marginTop: 8 },
    linkButton: { marginTop: 12 },
});

export default CreateAccountScreen;
