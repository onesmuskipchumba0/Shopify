import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../../components/SearchBar'
import Banner from '../../components/Banner'
import CategoryNav from '../../components/CategoryNav'
import CategoryCard from '../../components/CategoryCard'
import CarouselComponent from '../../components/CarouselComponent'
import CategoryHero from '../../components/CategoryHero'
import CategoriesComponent from '../../components/CategoriesComponent'

const index = () => {
  return (
    <View style={styles.container}>
      <SearchBar/>
      <ScrollView style={{marginBottom:150}}>
        <CarouselComponent />
        <CategoryNav />
        <CategoryCard />
        <Banner />
        <CategoryHero />
        <CategoriesComponent category={"smartphones"}/>
        <CategoriesComponent category={"womens-shoes"}/>
        <CategoriesComponent category={"laptops"}/>
      </ScrollView>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    width:'100%',
  }
})