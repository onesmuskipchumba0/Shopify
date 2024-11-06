import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import SecondaryBtn from './SecondaryBtn'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'


const Product = ({product}) => {
    const [favourite, setFavourite] = useState(false)
    const [exchangeRate, setExchangeRate] = useState()
    useEffect(() => {
        getExchangeRate()
    }, [])
    const getExchangeRate = async () => {
        try{
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/CUP')
            const data = await response.json()
            setExchangeRate(data.rates.KES)
        }catch(e){
            console.log(e)
        }finally{
            
        }
    }
    const toggleFavourite = () => {
        setFavourite(!favourite)
    }
  return (
    <Link href={`products/${product.id}`}>
      <View key={product.id} style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={{uri:product.images[0]}}></Image>
            <View key={product.id} style={styles.subcontainer}>
                <Text>{product.title}</Text>
                <View key={product.id} style={styles.btns}>
                    <Text style={styles.textPrice}>KSH {(product.price * exchangeRate).toFixed(2)}</Text>
                    <Ionicons name={favourite ? 'heart':'heart-outline'} color={favourite?'orange':"black"} onPress={()=> toggleFavourite()} size={24}/>
                </View>
            </View>
        </View>
    </Link>
  )
}

export default Product

const styles = StyleSheet.create({
    image:{
        width: 150,
        height: 150,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#ccc',
        marginBottom:'auto',
    },
    container:{
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'space-evenly',
        alignItems:"center",
        marginHorizontal:10
    },
    subcontainer:{
        marginBottom:'auto',
        alignItems:'center',
        marginTop:20,
        gap:10,
    },
    textPrice:{
        fontSize:18,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.8)',
        marginRight:4,
    },
    btns:{
        alignItems: 'center',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
    }
})