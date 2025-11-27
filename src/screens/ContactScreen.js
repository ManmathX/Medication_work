import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, IconButton, List, Surface, Text, useTheme } from 'react-native-paper';

const ContactScreen = () => {
    const theme = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
            <Card style={styles.headerCard} mode="elevated">
                <Card.Content>
                    <Text variant="headlineMedium" style={styles.title}>Get in Touch</Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>Have questions about our BMW models, financing, or test drives? We're here to help!</Text>
                </Card.Content>
            </Card>
            <Card style={styles.contactCard} mode="elevated">
                <Card.Title title="Contact Information" titleVariant="titleLarge" left={(props) => <IconButton {...props} icon="information" />} />
                <Card.Content>
                    <List.Item title="Email" description="support@bmwshowroom.com" left={props => <List.Icon {...props} icon="email" />} right={props => <IconButton {...props} icon="content-copy" />} />
                    <Divider />
                    <List.Item title="Phone" description="9752834140" left={props => <List.Icon {...props} icon="phone" />} right={props => <IconButton {...props} icon="phone-dial" />} />
                    <Divider />
                    <List.Item title="Address" description="123 Luxury Drive, Auto City, NY 10001" left={props => <List.Icon {...props} icon="map-marker" />} right={props => <IconButton {...props} icon="directions" />} />
                    <Divider />
                    <List.Item title="Working Hours" description="Monday – Saturday, 9:00 AM – 7:00 PM" left={props => <List.Icon {...props} icon="clock-outline" />} />
                </Card.Content>
            </Card>
            <Card style={styles.socialCard} mode="elevated">
                <Card.Title title="Follow Us" titleVariant="titleLarge" left={(props) => <IconButton {...props} icon="share-variant" />} />
                <Card.Content>
                    <View style={styles.socialButtons}>
                        <IconButton icon="facebook" size={32} mode="contained" />
                        <IconButton icon="instagram" size={32} mode="contained" />
                        <IconButton icon="twitter" size={32} mode="contained" />
                        <IconButton icon="youtube" size={32} mode="contained" />
                    </View>
                </Card.Content>
            </Card>
            <Surface style={styles.ctaSurface} elevation={2}>
                <Text variant="bodyMedium" style={styles.ctaText}>Visit our showroom to explore the latest BMW lineup!</Text>
            </Surface>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 16, paddingBottom: 32 },
    headerCard: { marginBottom: 16 },
    title: { fontWeight: 'bold', marginBottom: 8 },
    subtitle: { lineHeight: 24, opacity: 0.8 },
    contactCard: { marginBottom: 16 },
    socialCard: { marginBottom: 16 },
    socialButtons: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8 },
    ctaSurface: { padding: 16, borderRadius: 12 },
    ctaText: { textAlign: 'center', lineHeight: 22, fontStyle: 'italic' },
});

export default ContactScreen;
