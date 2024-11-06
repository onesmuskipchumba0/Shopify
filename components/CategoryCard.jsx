import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import Product from './Product'

const CategoryCard = ({category}) => {
    const endpoint = 'https://dummyjson.com/products?limit=10&skip=10'
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState()

    React.useEffect(()=>{
        fetchProducts()
    }, [])
    const fetchProducts = async () =>{
        try{
            const response = await fetch(endpoint)
            const data = await response.json()
            setProducts(data.products)
        }catch(e){
            setError(e.message)
        }finally{
            setLoading(false)
        }
    }
  return (
    <View style={styles.container}>
    <Text style={{fontSize:24,fontFamily:'PoppinsSemiBold'}}>Featured</Text>
    <ScrollView contentContainerStyle={{justifyContent:'center'}} horizontal={true} style={styles.scrollview}>
      {loading? <Text>Loading...</Text> : null}
      {error? <Text>Error: {error}</Text> : null}
      {products.map(product=>(
        <Product key={product.id} product={product}/>
      ))}
    </ScrollView>
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 330,
        marginBottom:0
    },
    scrollview:{
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})