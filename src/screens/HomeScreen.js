import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLastArticle } from '../components/useLastArticle';

const LastArticleWidget = ({ navigation }) => {
  const { lastArticle } = useLastArticle();

  if (!lastArticle) {
    return null;
  }

  const handleArticlePress = () => {
    navigation.navigate('Article', { url: lastArticle.url, title: lastArticle.title, urlToImage: lastArticle.image, author: lastArticle.author });
  };

  return (
    <TouchableOpacity style={styles.widgetContainer} onPress={handleArticlePress}>
      <Image
        style={styles.thumbnail}
        source={{ uri: lastArticle.image }}
      />
      <Text style={styles.widgetTitle}>{lastArticle.title}</Text>
      <Text style={styles.widgetAuthor}>By {lastArticle.author}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  const navigateToMeditation = () => {
    navigation.navigate('Meditation');
  };

  const navigateToCenters = () => {
    navigation.navigate('Centers');
  };

  const navigateToArticles = () => {
    navigation.navigate('Articles');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Mental Health Support App</Text>
      <LastArticleWidget navigation={navigation} />
      <TouchableOpacity style={styles.button} onPress={navigateToChat}>
        <Text style={styles.buttonText}>Chat with a Volunteer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToMeditation}>
        <Text style={styles.buttonText}>Guided Meditation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToCenters}>
        <Text style={styles.buttonText}>Find Centers Near You</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToArticles}>
        <Text style={styles.buttonText}>Mental Health Articles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#585db4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#d0dbf2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  widgetContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  widgetAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
