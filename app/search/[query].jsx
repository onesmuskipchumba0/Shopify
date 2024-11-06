import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Product from '../../components/Product'

const QueryScreen = () => {
    const {query} = useLocalSearchParams()
    const endpoint = `https://dummyjson.com/products/search?q=${query}`;
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        fetchProducts()
    }, [])
    const fetchProducts = async () =>{
        try{
            const response = await fetch(endpoint)
            const data = await response.json()
            setProducts(data.products)
            setLoading(false)
        } catch(error){
            setError(error)
            setLoading(false)
        } finally{
            setLoading(false)
        }
    }
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size={'large'}/>}
      {error && <Text>{error.message}</Text>}
      {products.length > 0 ? (
        <>
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <Text style={styles.title}>Products for {query}</Text><View>
                  {products.map(product => (
                    <View style={styles.subContainer}>
                        <Product product={product}/>
                    </View>
                  ))}
              </View>
        </ScrollView>
        </>
    ):(
        <Text>No products found for query: {query}</Text>
    )
    }
    </View>
  )
}

export default QueryScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        flex:1,
  
    },
    subContainer:{
        backgroundColor:'#F2F2F2',
        padding:40,
        borderRadius:5,
        marginBottom:5,
        alignItems:'center',
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:20,
    }
})