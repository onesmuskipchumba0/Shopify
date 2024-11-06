import { ActivityIndicator, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import Product from '../../components/Product';

const Category = () => {
    const { id } = useLocalSearchParams();
    const endpoint = `https://dummyjson.com/products/category/${id}`;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data.products);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error.message}</Text>
            </View>
        );
    }

    const renderProduct = ({ item }) => (
        <Link href={`products/${item.id}`} asChild>
            <Pressable style={styles.productCard}>
            <View key={item.id} style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={{uri:item.thumbnail}}></Image>
            <View key={item.id} style={styles.subcontainer}>
                <Text>{item.title}</Text>
                <Text style={styles.textPrice}>KSH {(item.price * exchangeRate).toFixed(2)}</Text>
                
            </View>
        </View>
            </Pressable>
        </Link>
    );

    return (
        
        <View style={styles.container}>
            <Text style={{fontFamily:'PoppinsBold',fontSize:24,textAlign:'center'}}>{id}</Text>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}  // Display items in two columns
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    listContent: {
        justifyContent: 'space-between', // Space between columns
        paddingBottom: 20,
    },
    image: {
        width: 120, // Full width of the card
        height: 120,
        marginBottom: 10,
        borderRadius: 12,
    },
    productCard: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 24,
        maxWidth: '45%',  // Each card takes up to 45% width
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        textAlign:'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
