import { StyleSheet, View } from 'react-native';
import { IconButton, Switch, Text, useTheme } from 'react-native-paper';

const Header = ({ title, isDarkTheme, onThemeToggle, isMusicPlaying, onMusicToggle }) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.colors.onBackground }]} variant="headlineSmall">{title}</Text>
            <View style={styles.controls}>
                <IconButton icon={isMusicPlaying ? 'music' : 'music-off'} size={24} onPress={onMusicToggle} iconColor={theme.colors.primary} />
                <Switch value={isDarkTheme} onValueChange={onThemeToggle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold' },
    controls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});

export default Header;
