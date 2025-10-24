import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Text,
  useTheme,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
const ChatBot = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m your BMW assistant. Ask me anything about our luxury vehicles, features, pricing, or schedule a test drive!',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const getBMWResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('x5')) {
      return 'The BMW X5 is our luxury midsize SUV, priced at $75,000. It features a powerful engine, spacious interior with seating for 7, advanced safety systems, and the latest iDrive technology. Perfect for families who want luxury and performance!';
    }
    
    if (lowerQuestion.includes('3 series') || lowerQuestion.includes('3series')) {
      return 'The BMW 3 Series is our iconic sporty sedan, starting at $42,000. Known for its perfect balance of performance and luxury, it features a turbocharged engine, premium interior, and exceptional handling. A true driver\'s car!';
    }
    
    if (lowerQuestion.includes('i8')) {
      return 'The BMW i8 is our stunning hybrid sports car, priced at $140,000. It combines a turbocharged engine with electric motors for incredible performance and efficiency. Features butterfly doors, futuristic design, and cutting-edge technology!';
    }
    
    if (lowerQuestion.includes('m4')) {
      return 'The BMW M4 Competition is our high-performance coupe at $85,000. With a twin-turbo inline-6 engine producing 503 hp, it delivers thrilling acceleration and track-ready performance. Perfect for enthusiasts who demand the best!';
    }
    
    if (lowerQuestion.includes('7 series') || lowerQuestion.includes('7series')) {
      return 'The BMW 7 Series is our flagship luxury sedan, priced at $99,000. It offers the ultimate in comfort, technology, and refinement. Features include massage seats, executive lounge seating, gesture controls, and a crystal gear selector!';
    }
    
    if (lowerQuestion.includes('test drive') || lowerQuestion.includes('drive')) {
      return 'I\'d be happy to help you schedule a test drive! Visit our Contact page for our phone number and address, or call us at 9752834140. We\'re open Monday-Saturday, 9 AM - 7 PM. Which BMW model interests you?';
    }
    
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('expensive')) {
      return 'Our BMW models range from $42,000 (3 Series) to $140,000 (i8). We offer:\n• 3 Series: $42,000\n• X5: $75,000\n• M4 Competition: $85,000\n• 7 Series: $99,000\n• i8: $140,000\n\nWe also offer flexible financing options!';
    }
    
    if (lowerQuestion.includes('financ') || lowerQuestion.includes('payment') || lowerQuestion.includes('loan')) {
      return 'We offer competitive financing options with flexible terms! Our finance team can help you with:\n• Low APR rates\n• Lease options\n• Trade-in evaluations\n• Custom payment plans\n\nContact us at 9752834140 to discuss your financing needs!';
    }
    
    if (lowerQuestion.includes('feature') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech')) {
      return 'All our BMW models come with premium features including:\n• iDrive infotainment system\n• Advanced driver assistance\n• Premium sound systems\n• Leather interiors\n• Adaptive LED headlights\n• Wireless charging\n\nWhich model would you like to know more about?';
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('location') || lowerQuestion.includes('address') || lowerQuestion.includes('where')) {
      return 'Visit us at:\n📍 123 Luxury Drive, Auto City, NY 10001\n📞 9752834140\n📧 support@bmwshowroom.com\n🕒 Monday-Saturday, 9 AM - 7 PM\n\nWe look forward to seeing you!';
    }
    
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return 'Hello! Welcome to BMW Showroom. I\'m here to help you find your perfect BMW. What would you like to know about our luxury vehicles?';
    }
    
    if (lowerQuestion.includes('thank')) {
      return 'You\'re welcome! Feel free to ask me anything else about our BMW vehicles. I\'m here to help!';
    }
    
    return 'I\'m here to help you with information about our BMW models (X5, 3 Series, i8, M4 Competition, 7 Series), pricing, features, financing, and test drives. What would you like to know?';
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const question = inputText;
    setInputText('');
    setLoading(true);

    setTimeout(() => {
      const botReply = getBMWResponse(question);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 800);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isBot ? styles.botMessage : styles.userMessage,
      ]}
    >
      <Card
        style={[
          styles.messageCard,
          {
            backgroundColor: item.isBot
              ? theme.colors.surfaceVariant
              : theme.colors.primaryContainer,
          },
        ]}
      >
        <Card.Content>
          <Text
            style={{
              color: item.isBot
                ? theme.colors.onSurfaceVariant
                : theme.colors.onPrimaryContainer,
            }}
          >
            {item.text}
          </Text>
          <Text
            variant="labelSmall"
            style={{
              marginTop: 4,
              color: item.isBot
                ? theme.colors.onSurfaceVariant
                : theme.colors.onPrimaryContainer,
              opacity: 0.7,
            }}
          >
            {item.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onBackground, fontWeight: 'bold' }}
        >
          BMW Assistant
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onBackground, opacity: 0.7 }}
        >
          Your BMW Expert Guide
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text
            variant="bodySmall"
            style={{ marginLeft: 8, color: theme.colors.onBackground }}
          >
            Thinking...
          </Text>
        </View>
      )}

      <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
        <TextInput
          mode="outlined"
          placeholder="Ask about BMW cars..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          multiline
          maxLength={500}
          onSubmitEditing={sendMessage}
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
              disabled={!inputText.trim() || loading}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  messageCard: {
    borderRadius: 12,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    maxHeight: 100,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 4,
  },
});

export default ChatBot;
