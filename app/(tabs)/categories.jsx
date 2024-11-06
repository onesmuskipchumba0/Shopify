import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import SearchBar from '../../components/SearchBar'
import CategoriesComponent from '../../components/CategoriesComponent'
import { categories_num } from '../../components/CategoryNav'
const categories = () => {
  const endpoint = 'https://dummyjson.com/products/category-list'
    const [categories,setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        fetchCategories()
    }, [])
    const fetchCategories = async () => {
        try {
            const response = await fetch(endpoint)
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    
  return (
    <View style={styles.container}>
      <SearchBar/>
      <ScrollView>
            {categories.map((element, index)=>(
              <CategoriesComponent category={element} key={index}/>
            ))}
      </ScrollView>
    </View>
  )
}

export default categories

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        alignItems:'center'
      }
})