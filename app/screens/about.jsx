import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.text}>Hello! I'm Onesmus Bett, a Computer Science student passionate about building efficient and engaging software.</Text>
      
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <View style={styles.infoContainer}>
        <Ionicons name="mail-outline" size={20} color="#555" />
        <Text style={styles.infoText} onPress={() => Linking.openURL('mailto:onesmuskipchumba5@gmail.com')}>
          onesmuskipchumba5@gmail.com
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="logo-github" size={20} color="#555" />
        <Text style={styles.infoText} onPress={() => Linking.openURL('https://github.com/onesmuskipchumba0')}>
          github.com/onesmuskipchumba0
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Tech Stack</Text>
      <Text style={styles.text}>React, React Native, Express, Node.js, Python, Django, HTML, CSS</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#1e90ff',
    marginLeft: 8,
  },
});

export default AboutScreen;
