import axios from 'axios';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ChatScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [data, setData] = useState([]);
  const apikey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'

  const handleLogin = () => {
    if (username.trim() !== '') {
      setLoggedIn(true);
    }
  };

  const handleSend = async () => {
    const prompt = inputMessage
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5
      
    }, {

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      }

    });
    const text = response.data.choices[0].text;
    setData([...data, {type: 'user', 'text': inputMessage}, {type: 'bot', 'text': text}]);
    setInputMessage('');

    return (
        <Text style={styles.messageText}>{`${text}`}</Text>
    )
    
  }  

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: username,
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    handleSend();
  };

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <>
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>{`${item.sender}: ${item.text}`}</Text>
                </View>
              )}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Type your message here..."
              />
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.usernameInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your name..."
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apikey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'
    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {
        const prompt = textInput
        const response = await axios.post(apiUrl, {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5
          
        }, {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apikey}`
          }

        });
        const text = response.data.choices[0].text;
        setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': text}]);
        setTextInput('');
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#585db4',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#585db4',
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
