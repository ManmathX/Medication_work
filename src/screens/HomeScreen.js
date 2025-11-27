import { Audio, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    Banner,
    Divider,
    FAB,
    Searchbar,
    Surface,
    Text,
    useTheme,
} from 'react-native-paper';
import CarCard from '../components/CarCard';
import Header from '../components/Header';

// TODO: move this to a separate file later
const cars = [
    { id: '1', name: 'BMW X5', price: 75000, description: 'Luxury midsize SUV with powerful performance', image: 'https://i.pinimg.com/1200x/30/64/b4/3064b4c9ef35b0085842303686c6a842.jpg' },
    { id: '2', name: 'BMW 3 Series', price: 42000, description: 'Sporty sedan with perfect balance', image: 'https://i.pinimg.com/1200x/f9/a8/9e/f9a89eacbb91a3ebdca6f68b8245af3b.jpg' },
    { id: '3', name: 'BMW i8', price: 140000, description: 'Hybrid sports car with futuristic design', image: 'https://i.pinimg.com/736x/fd/82/21/fd82214aaddc196cd9c532913dc04d36.jpg' },
    { id: '4', name: 'BMW M4 Competition', price: 85000, description: 'High-performance coupe', image: 'https://i.pinimg.com/736x/96/da/14/96da14a20228cec95bd7063e3d35ff7e.jpg' },
    { id: '5', name: 'BMW 7 Series', price: 99000, description: 'Flagship luxury sedan', image: 'https://i.pinimg.com/736x/f7/03/c0/f703c0cfa804f16a2672e4cfcaecdff4.jpg' },
];

const HomeScreen = ({ navigation, isDarkTheme, onThemeToggle }) => {
    const theme = useTheme();
    let videoRef = useRef(null); // using let here
    const [searchQuery, setSearchQuery] = useState('');
    let [bannerVisible, setBannerVisible] = useState(true); // inconsistent let usage
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        var soundObject = null; // using var instead of let/const
        async function loadSound() {
            try {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    shouldDuckAndroid: true,
                });
                const { sound: newSound } = await Audio.Sound.createAsync(
                    require('../../assets/background-music.mp3'),
                    { isLooping: true, volume: 0.3 },
                    (status) => {
                        if (status.isLoaded) {
                            setIsPlaying(status.isPlaying);
                            console.log('Music status:', status.isPlaying); // debug log
                        }
                    }
                );
                soundObject = newSound;
                setSound(newSound);
                await newSound.playAsync();
                setIsPlaying(true);
            } catch (error) {
                console.log('Error loading sound:', error);
            }
        }
        loadSound();
        return () => {
            if (soundObject) soundObject.unloadAsync();
        };
    }, []);

    const toggleMusic = async () => {
        if (sound) {
            // TODO: add better error handling here
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        }
    };

    // filter cars by search
    let filteredCars = cars.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCarCard = ({ item }) => (
        <CarCard car={item} onPress={() => {
            console.log('Selected car:', item.name); // debug
            navigation.navigate('CarDetails', { car: item });
        }} />
    );

    const renderListHeader = () => (
        <>
            <Banner
                visible={bannerVisible}
                actions={[{ label: 'Dismiss', onPress: () => setBannerVisible(false) }]}
                icon="car-sports"
                style={styles.banner}
            >
                Welcome to BMW Showroom! Explore our luxury collection.
            </Banner>
            <Surface style={styles.videoSurface} elevation={2}>
                <Text variant="titleMedium" style={styles.videoTitle}>Featured Video</Text>
                <Video
                    ref={videoRef}
                    source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' }}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    shouldPlay={false}
                />
            </Surface>
            <Divider style={styles.divider} />
            <Text variant="titleLarge" style={styles.sectionTitle}>Our Collection</Text>
        </>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                title="BMW Showroom"
                isDarkTheme={isDarkTheme}
                onThemeToggle={onThemeToggle}
                isMusicPlaying={isPlaying}
                onMusicToggle={toggleMusic}
            />
            <Divider />
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search cars..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    icon="car-search"
                    elevation={1}
                />
            </View>
            <FlatList
                data={filteredCars}
                renderItem={renderCarCard}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderListHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
            <FAB
                icon={isPlaying ? 'music' : 'music-off'}
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={toggleMusic}
                label={isPlaying ? 'Music On' : 'Music Off'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    searchContainer: { paddingHorizontal: 12, paddingVertical: 12 },
    banner: { marginBottom: 8 },
    videoSurface: { margin: 12, padding: 12, borderRadius: 12 },
    videoTitle: { marginBottom: 8, fontWeight: '600' },
    video: { width: '100%', height: 180, borderRadius: 8, backgroundColor: '#000' },
    divider: { marginVertical: 8 },
    sectionTitle: { paddingHorizontal: 16, paddingVertical: 12, fontWeight: 'bold' },
    listContent: { paddingHorizontal: 12, paddingBottom: 80 },
    fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});

export default HomeScreen;
