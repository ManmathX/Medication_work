import { StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const ChatMessage = ({ message }) => {
    const theme = useTheme();
    const formattedTime = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const backgroundColor = message.isBot ? theme.colors.surfaceVariant : theme.colors.primaryContainer;
    const textColor = message.isBot ? theme.colors.onSurfaceVariant : theme.colors.onPrimaryContainer;

    return (
        <Card style={[styles.messageContainer, message.isBot ? styles.botMessage : styles.userMessage, { backgroundColor }]}>
            <Card.Content>
                <Text style={{ color: textColor }}>{message.text}</Text>
                <Text variant="labelSmall" style={[styles.timestamp, { color: textColor }]}>{formattedTime}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    messageContainer: { marginBottom: 12, maxWidth: '80%', borderRadius: 12 },
    botMessage: { alignSelf: 'flex-start' },
    userMessage: { alignSelf: 'flex-end' },
    timestamp: { marginTop: 4, opacity: 0.7 },
});

export default ChatMessage;
