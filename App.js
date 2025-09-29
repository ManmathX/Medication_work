// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Appbar,
  Card,
  Text,
  TextInput,
  useTheme,
  Switch,
} from "react-native-paper";

function InnerApp({ isSwitchOn, onToggleSwitch }) {
  const [text, setText] = React.useState("");
  const [textEmail, setTextEmail] = React.useState("");

  const theme = useTheme();

  const handleReset = () => {
    setText("");
    setTextEmail("");
  };

  const handleSave = () => {
    console.log("Saved:", { name: text, email: textEmail });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Title" />
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </Appbar.Header>

      <Card style={[styles.card, { backgroundColor: theme.colors.primary }]}>
        <Card.Title title="Card Title" />
        <Card.Content>
          <Text style={styles.title}>Simple Form</Text>
          <TextInput
            label="Name"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={textEmail}
            onChangeText={setTextEmail}
            style={styles.input}
          />
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={handleReset}>
            Reset
          </Button>
          <Button mode="contained" onPress={handleSave}>
            Save
          </Button>
        </Card.Actions>
      </Card>

      <StatusBar style={isSwitchOn ? "light" : "dark"} />
    </View>
  );
}

export default InnerApp;

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: 10, padding: 8 },
  input: { marginBottom: 12 },
  actions: { justifyContent: "flex-end", gap: 10 },
  title: { marginBottom: 8, fontWeight: "bold" },
});
