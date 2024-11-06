import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const CategoryHero = () => {
  const images = [
    { id: 1, link: "home", url: require('../assets/images/categories/Home.png') },
    { id: 2, link: "laptops", url: require('../assets/images/categories/Laptops.png') },
    { id: 3, link: "appliances", url: require('../assets/images/categories/LargeAppliances.png') },
    { id: 4, link: "music", url: require('../assets/images/categories/Music.png') },
    { id: 5, link: 'phones', url: require('../assets/images/categories/Phones.png') },
    { id: 6, link: "tv", url: require('../assets/images/categories/TVs.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Flash Deals</Text>
      <View style={styles.gridContainer}>
        {images.map((item) => (
          <Link href={`search/${item.link}`} key={item.id}>
            <View style={styles.subContainer}>
              <Image resizeMode='contain' source={item.url} style={styles.image} />
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryHero;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'PoppinsSemiBold',
    marginBottom: 15,  // Increase bottom margin for more space under header
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 1,  // Adds padding on the sides
  },
  subContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 0,
    width: 140,
    height: 140,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120, // Adjusted to fit better with increased padding
    height: 120,
  },
});
