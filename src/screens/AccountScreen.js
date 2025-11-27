import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Divider, List, Surface, Text, useTheme } from 'react-native-paper';

const AccountScreen = () => {
    const theme = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
            <Card style={styles.profileCard} mode="elevated">
                <Card.Content style={styles.profileContent}>
                    <Avatar.Icon size={80} icon="account-circle" style={styles.avatar} />
                    <Text variant="headlineSmall" style={styles.welcomeText}>Welcome to BMW Showroom</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>Sign in to unlock exclusive features</Text>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                    <Button mode="contained" icon="login" style={styles.signInButton}>Sign In</Button>
                    <Button mode="outlined" icon="account-plus">Create Account</Button>
                </Card.Actions>
            </Card>
            <Card style={styles.benefitsCard} mode="elevated">
                <Card.Title title="Member Benefits" titleVariant="titleLarge" left={(props) => <Avatar.Icon {...props} icon="star" size={40} />} />
                <Card.Content>
                    <List.Item title="Save Favorites" description="Bookmark your favorite BMW models" left={props => <List.Icon {...props} icon="heart" />} />
                    <Divider />
                    <List.Item title="Test Drive History" description="Track your appointments" left={props => <List.Icon {...props} icon="calendar-check" />} />
                    <Divider />
                    <List.Item title="Personalized Recommendations" description="Get suggestions based on preferences" left={props => <List.Icon {...props} icon="lightbulb" />} />
                    <Divider />
                    <List.Item title="Exclusive Offers" description="Member-only deals" left={props => <List.Icon {...props} icon="tag" />} />
                </Card.Content>
            </Card>
            <Surface style={styles.infoSurface} elevation={1}>
                <Text variant="bodySmall" style={styles.infoText}>Your data is secure and will never be shared with third parties.</Text>
            </Surface>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 16, paddingBottom: 32 },
    profileCard: { marginBottom: 16 },
    profileContent: { alignItems: 'center', paddingVertical: 24 },
    avatar: { marginBottom: 16 },
    welcomeText: { fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    subtitle: { opacity: 0.7, textAlign: 'center' },
    cardActions: { justifyContent: 'center', paddingBottom: 16, gap: 8 },
    signInButton: { minWidth: 120 },
    benefitsCard: { marginBottom: 16 },
    infoSurface: { padding: 16, borderRadius: 12 },
    infoText: { textAlign: 'center', opacity: 0.6, lineHeight: 18 },
});

export default AccountScreen;
