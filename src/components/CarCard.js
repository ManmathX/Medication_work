import { StyleSheet } from 'react-native';
import { Card, Chip, Text, useTheme } from 'react-native-paper';

const CarCard = ({ car, onPress }) => {
    const theme = useTheme();

    return (
        <Card style={styles.card} mode="elevated" onPress={onPress}>
            <Card.Cover source={{ uri: car.image }} style={styles.cover} />
            <Card.Content style={styles.content}>
                <Text variant="titleLarge" style={styles.name} numberOfLines={1}>{car.name}</Text>
                <Chip icon="currency-usd" style={styles.priceChip} textStyle={styles.priceText}>{car.price.toLocaleString()}</Chip>
                <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>{car.description}</Text>
            </Card.Content>
            <Card.Actions>
                <Text variant="labelMedium" style={{ color: theme.colors.primary }}>View Details →</Text>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: { marginBottom: 16, marginHorizontal: 4 },
    cover: { height: 180 },
    content: { paddingTop: 12 },
    name: { fontWeight: '600', marginBottom: 8 },
    priceChip: { alignSelf: 'flex-start', marginBottom: 8 },
    priceText: { fontWeight: '700' },
    description: { lineHeight: 20, opacity: 0.8 },
});

export default CarCard;
