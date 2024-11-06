import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
/*  */
/* export const categories_num = length(categories) */
const CategoryNav = () => {
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
    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}  horizontal={true}>
        {loading && <Text>Loading Categories...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        {categories.map((category,index) => (
            <TouchableOpacity  style={styles.subContainer} key={index}>
                <Link href={`screens/${category}`}>
                    <Text style={styles.text}>{category}</Text>
                </Link>
            </TouchableOpacity>
        ))}
    </ScrollView>
    </View>
  )
}

export default CategoryNav

const styles = StyleSheet.create({
    container:{
        gap:10,
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    subContainer:{
        justifyContent:'space-between',
        alignItems: 'center',
        marginHorizontal:12,
        padding:10,
        borderRadius:10,
        backgroundColor:'#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        borderColor:'black',
        borderWidth: 0.2,
    },
    scrollContainer:{
        justifyContent: 'center',
        alignItems:'center',
    },
    text:{
        fontFamily:'PoppinsRegular',
    }
})