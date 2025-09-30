// CarDetails.js
import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';


const CarDetails = ({ route }) => {
  const { car } = route.params;
  const theme = useTheme(); // Get current theme (dark or light)

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>{car.name}</Text>
      <Text style={[styles.price, { color: theme.colors.primary }]}>${car.price.toLocaleString()}</Text>
      <Text style={[styles.description, { color: theme.colors.onBackground }]}>{car.description}</Text>
      <Text style={[styles.blog, { color: theme.colors.onBackground }]}>
        The {car.name} is one of BMW’s finest creations, blending innovation, luxury,
        and unmatched driving experience. Known for its {car.description.toLowerCase()},
        it continues to be a favorite among enthusiasts worldwide.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 240, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  description: { fontSize: 16, marginBottom: 16 },
  blog: { fontSize: 15, lineHeight: 22 },
});

export default CarDetails;
