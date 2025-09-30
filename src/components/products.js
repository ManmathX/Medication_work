import React, { useContext, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  Text,
  Switch,
  useTheme,
  Searchbar,
  BottomNavigation,
  Card,
  Button,
} from 'react-native-paper';
import { ThemeContext } from '../../App';
import { Video } from 'expo-av';


const Products = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'contact', title: 'Contact', focusedIcon: 'phone' },
    { key: 'auction', title: 'Auction', focusedIcon: 'gavel' },
    { key: 'community', title: 'Community', focusedIcon: 'account-group' },
    { key: 'account', title: 'Account', focusedIcon: 'account' },
  ]);

  // Scenes for BottomNavigation
  const ContactRoute = () => (
    <View style={styles.routeContainer}>
      <Text variant="titleMedium">Contact Us</Text>
      <Text style={{ marginTop: 8 }}>Email: support@example.com{"\n"}Phone: +1 555 123 456</Text>
    </View>
  );

  const AuctionRoute = () => (
    <View style={styles.routeContainer}>
      <Text variant="titleMedium">Current Auctions</Text>
      <Text style={{ marginTop: 8 }}>No active auctions right now.</Text>
    </View>
  );

  const CommunityRoute = () => (
    <View style={styles.routeContainer}>
      <Text variant="titleMedium">Community</Text>
      <Text style={{ marginTop: 8 }}>Join our forums and events.</Text>
    </View>
  );

  const AccountRoute = () => (
    <View style={styles.routeContainer}>
      <Text variant="titleMedium">Account</Text>
      <Text style={{ marginTop: 8 }}>Sign in to view saved cars and preferences.</Text>
      <Button mode="contained" style={{ marginTop: 12 }} onPress={() => navigation.navigate('SignIn')}>
        Sign In
      </Button>
    </View>
  );

  const renderScene = BottomNavigation.SceneMap({
    contact: ContactRoute,
    auction: AuctionRoute,
    community: CommunityRoute,
    account: AccountRoute,
  });

  const theme = useTheme();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const videoRef = useRef(null);

  const products = [
    { id: '1', name: 'BMW X5', price: 75000, description: 'Luxury midsize SUV...', image: 'https://i.pinimg.com/1200x/30/64/b4/3064b4c9ef35b0085842303686c6a842.jpg' },
    { id: '2', name: 'BMW 3 Series', price: 42000, description: 'Sporty sedan...', image: 'https://i.pinimg.com/1200x/f9/a8/9e/f9a89eacbb91a3ebdca6f68b8245af3b.jpg' },
    { id: '3', name: 'BMW i8', price: 140000, description: 'Hybrid sports car...', image: 'https://i.pinimg.com/736x/fd/82/21/fd82214aaddc196cd9c532913dc04d36.jpg' },
    { id: '4', name: 'BMW M4 Competition', price: 85000, description: 'High-performance coupe...', image: 'https://i.pinimg.com/736x/96/da/14/96da14a20228cec95bd7063e3d35ff7e.jpg' },
    { id: '5', name: 'BMW 7 Series', price: 99000, description: 'Flagship luxury sedan...', image: 'https://i.pinimg.com/736x/f7/03/c0/f703c0cfa804f16a2672e4cfcaecdff4.jpg' },
  ];

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate('CarDetails', { car: item })}
      accessibilityLabel={`Open details for ${item.name}`}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={[styles.name, { color: theme.colors.onSurface }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.colors.primary }]}>${item.price.toLocaleString()}</Text>
        <Text numberOfLines={2} style={[styles.desc, { color: theme.colors.onSurface }]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: theme.colors.onBackground }]}>BMW Showroom</Text>
        <View style={styles.headerRight}>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search cars..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          inputAccessibilityLabel="Search cars"
        />
      </View>

      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay={false} // do not autoplay
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 12, paddingBottom: 90 }}
        />
      </View>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        safeAreaInsets={{ bottom: Platform.OS === 'android' ? 0 : undefined }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  header: { fontSize: 22, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  searchContainer: { paddingHorizontal: 12, paddingBottom: 8 },
  videoWrapper: { padding: 10 },
  video: { width: '100%', height: 200, borderRadius: 10, backgroundColor: '#000' },
  listContainer: { flex: 1 },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  image: { width: '100%', height: 160, borderRadius: 8, marginBottom: 8 },
  cardText: { paddingHorizontal: 6 },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: '700' },
  desc: { marginTop: 6, fontSize: 13 },
  routeContainer: {
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Products;
