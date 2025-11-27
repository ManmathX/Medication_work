import { StyleSheet } from 'react-native';

const getBMWResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
        return 'Hello! Welcome to BMW Showroom. How can I help you today?';
    }
    if (lowerQuestion.includes('x5')) {
        return 'The BMW X5 is our luxury midsize SUV, priced at $75,000. Features powerful engine, spacious interior.';
    }
    if (lowerQuestion.includes('3 series')) {
        return 'The BMW 3 Series is our iconic sporty sedan, starting at $42,000. Perfect balance of performance and luxury.';
    }
    if (lowerQuestion.includes('price')) {
        return 'Our BMW models range from $42,000 to $140,000. We offer flexible financing options!';
    }
    if (lowerQuestion.includes('contact')) {
        return 'Visit us at 123 Luxury Drive, Auto City, NY 10001. Call: 9752834140';
    }
    return 'I can help with BMW models, pricing, features, and test drives. What would you like to know?';
};

const ChatBotScreen = () => {
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' },
    messagesList: { padding: 16, paddingBottom: 8 },
    inputContainer: { padding: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)' },
    input: { maxHeight: 100 },
    loadingContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, paddingBottom: 4 },
});

export default ChatBotScreen;
