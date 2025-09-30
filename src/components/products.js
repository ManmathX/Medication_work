import React, { useContext } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import { ThemeContext } from '../../App';

const Products = ({ navigation }) => {
  const theme = useTheme();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  const products = [
    { id: '1', name: 'BMW X5', price: 75000, description: 'A luxury midsize SUV that blends performance, comfort, and cutting-edge technology.', image: 'https://i.pinimg.com/1200x/30/64/b4/3064b4c9ef35b0085842303686c6a842.jpg' },
    { id: '2', name: 'BMW 3 Series', price: 42000, description: 'A sporty sedan with agile handling, efficient engines, and advanced driver assistance.', image: 'https://i.pinimg.com/1200x/f9/a8/9e/f9a89eacbb91a3ebdca6f68b8245af3b.jpg' },
    { id: '3', name: 'BMW i8', price: 140000, description: 'A plug-in hybrid sports car with futuristic design and thrilling performance.', image: 'https://i.pinimg.com/736x/fd/82/21/fd82214aaddc196cd9c532913dc04d36.jpg' },
    { id: '4', name: 'BMW M4 Competition', price: 85000, description: 'A high-performance coupe with twin-turbo power, precision handling, and iconic styling.', image: 'https://i.pinimg.com/736x/96/da/14/96da14a20228cec95bd7063e3d35ff7e.jpg' },
    { id: '5', name: 'BMW 7 Series', price: 99000, description: 'The flagship luxury sedan offering supreme comfort, innovative tech, and a powerful drive.', image: 'https://i.pinimg.com/736x/f7/03/c0/f703c0cfa804f16a2672e4cfcaecdff4.jpg' },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate('CarDetails', { car: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.colors.onSurface }]}>{item.name}</Text>
      <Text style={[styles.price, { color: theme.colors.primary }]}>${item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.colors.onBackground }]}>BMW Showroom</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  header: { fontSize: 22, fontWeight: 'bold' },
  card: { marginBottom: 20, borderRadius: 12, padding: 12, elevation: 3 },
  image: { width: '100%', height: 180, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 'bold' },
});

export default Products;
