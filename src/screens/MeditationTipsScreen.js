import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useLastArticle, LastArticleProvider } from '../components/useLastArticle';

const MeditationTipsScreen = () => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();
  const { setLastArticle } = useLastArticle(); 
  
  useEffect(() => {
    fetchMentalHealthArticles();
  }, []);

  const fetchMentalHealthArticles = async () => {
    try {
      const apiKey = '97d7c90fdae646f1a5409942c6df3dbf';
      const apiUrl = `https://newsapi.org/v2/everything?q=mental%20health&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      if (response.data?.articles) {
        setArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleArticlePress = (articleUrl, articleTitle) => {
    navigation.navigate('Article', { url: articleUrl, title: articleTitle });
  };

  useEffect(() => {
    if (articles.length > 0) {
      setLastArticle({
        title: articles[0].title,
        url: articles[0].url,
        urlToImage: articles[0].urlToImage,
        author: articles[0].author,
      });
    }
  }, [articles, setLastArticle]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mental Health Articles</Text>
      <ScrollView>
        {articles.map((article) => (
          article.urlToImage && article.title && article.author ? (
            <TouchableOpacity
              key={article.title}
              style={styles.articleContainer}
              onPress={() => handleArticlePress(article.url, article.title)}
            >
              <Image
                style={styles.thumbnail}
                source={{ uri: article.urlToImage }}
              />
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleAuthor}>By {article.author}</Text>
            </TouchableOpacity>
          ) : null
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        marginTop: 30,
      },
    }),
  },
  articleContainer: {
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
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default MeditationTipsScreen;
