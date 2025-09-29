import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { Text } from "react-native-paper";

const Products = ({ isDark }) => {
  const [products] = useState([
    {
      id: "1",
      name: "BMW X5",
      price: 75000,
      description:
        "A luxury midsize SUV that blends performance, comfort, and cutting-edge technology.",
      image:
        "https://i.pinimg.com/1200x/58/87/ab/5887ab621a92579a70797f35dde5a0fd.jpg",
    },
    {
      id: "2",
      name: "BMW 3 Series",
      price: 42000,
      description:
        "A sporty sedan with agile handling, efficient engines, and advanced driver assistance.",
      image:
        "https://i.pinimg.com/736x/6b/bf/40/6bbf40329ee8c28deeb0aae33391a944.jpg",
    },
    {
      id: "3",
      name: "BMW i8",
      price: 140000,
      description:
        "A plug-in hybrid sports car with futuristic design and thrilling performance.",
      image:
        "https://i.pinimg.com/736x/8d/90/1a/8d901ac17833d3524e7b52378c1ef002.jpg",
    },
    {
      id: "4",
      name: "BMW M4 Competition",
      price: 85000,
      description:
        "A high-performance coupe with twin-turbo power, precision handling, and iconic styling.",
      image:
        "https://i.pinimg.com/736x/0d/65/33/0d653302ac1557bd153b10cafc477fdf.jpg",
    },
    {
      id: "5",
      name: "BMW 7 Series",
      price: 99000,
      description:
        "The flagship luxury sedan offering supreme comfort, innovative tech, and a powerful drive.",
      image:
        "https://i.pinimg.com/1200x/30/64/b4/3064b4c9ef35b0085842303686c6a842.jpg",
    },
  ]);

  const renderProduct = ({ item }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? "#111" : "#f9f9f9" }, // adapt card bg
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>
        {item.name}
      </Text>
      <Text style={styles.price}>${item.price.toLocaleString()}</Text>
      <Text style={[styles.description, { color: isDark ? "#aaa" : "#555" }]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" }, // screen background
      ]}
    >
      <Text
        style={[
          styles.header,
          { color: isDark ? "#fff" : "#000" }, // header text adapts
        ]}
      >
        BMW Showroom Products
      </Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        nestedScrollEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4da6ff", // BMW blue, stays same
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
  },
});

export default Products;
