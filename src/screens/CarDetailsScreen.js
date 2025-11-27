import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, List, Surface, Text, useTheme } from 'react-native-paper';

const CarDetailsScreen = ({ route }) => {
    const { car } = route.params;
    const theme = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
            <Card style={styles.imageCard} mode="elevated">
                <Card.Cover source={{ uri: car.image }} style={styles.cover} />
            </Card>
            <Surface style={styles.infoSurface} elevation={1}>
                <Text variant="headlineMedium" style={styles.title}>{car.name}</Text>
                <Chip icon="currency-usd" mode="flat" style={styles.priceChip} textStyle={styles.priceText}>
                    {car.price.toLocaleString()}
                </Chip>
                <Divider style={styles.divider} />
                <View style={styles.chipContainer}>
                    <Chip icon="engine" style={styles.chip}>Powerful Engine</Chip>
                    <Chip icon="shield-check" style={styles.chip}>Safety First</Chip>
                    <Chip icon="star" style={styles.chip}>Premium</Chip>
                </View>
                <Divider style={styles.divider} />
                <Text variant="bodyLarge" style={styles.description}>{car.description}</Text>
                <Text variant="bodyMedium" style={styles.blog}>
                    The {car.name} is one of BMW's finest creations, blending innovation, luxury, and unmatched driving experience.
                </Text>
            </Surface>
            <Surface style={styles.featuresSurface} elevation={1}>
                <Text variant="titleLarge" style={styles.featuresTitle}>Key Features</Text>
                <List.Item title="iDrive Infotainment" description="Latest BMW technology" left={props => <List.Icon {...props} icon="monitor-dashboard" />} />
                <Divider />
                <List.Item title="Premium Sound System" description="Immersive audio experience" left={props => <List.Icon {...props} icon="speaker" />} />
                <Divider />
                <List.Item title="Advanced Safety" description="Driver assistance systems" left={props => <List.Icon {...props} icon="shield-car" />} />
                <Divider />
                <List.Item title="Leather Interior" description="Luxury craftsmanship" left={props => <List.Icon {...props} icon="car-seat" />} />
            </Surface>
            <View style={styles.actionButtons}>
                <Button mode="contained" icon="phone" style={styles.button}>Contact Us</Button>
                <Button mode="outlined" icon="car" style={styles.button}>Book Test Drive</Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    imageCard: { margin: 16, marginBottom: 8 },
    cover: { height: 280 },
    infoSurface: { margin: 16, marginTop: 8, padding: 16, borderRadius: 12 },
    title: { fontWeight: 'bold', marginBottom: 12 },
    priceChip: { alignSelf: 'flex-start', marginBottom: 8 },
    priceText: { fontSize: 18, fontWeight: '700' },
    divider: { marginVertical: 12 },
    chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { marginRight: 8, marginBottom: 8 },
    description: { lineHeight: 24, marginBottom: 16 },
    blog: { lineHeight: 22, opacity: 0.8 },
    featuresSurface: { margin: 16, marginTop: 8, borderRadius: 12, overflow: 'hidden' },
    featuresTitle: { padding: 16, paddingBottom: 8, fontWeight: 'bold' },
    actionButtons: { padding: 16, gap: 12, paddingBottom: 32 },
    button: { paddingVertical: 4 },
});

export default CarDetailsScreen;
