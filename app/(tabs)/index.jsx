import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../../components/SearchBar'
import Banner from '../../components/Banner'
import CategoryNav from '../../components/CategoryNav'
import CategoryCard from '../../components/CategoryCard'
import CarouselComponent from '../../components/CarouselComponent'

const index = () => {
  return (
    <View style={styles.container}>
      <SearchBar/>
      <ScrollView>
        <Banner />
        <CategoryNav />
        <CategoryCard />
        {/* <CarouselComponent /> */}
      </ScrollView>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    alignItems:'center'
  }
})