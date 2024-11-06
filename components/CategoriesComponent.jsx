import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React,{useState, useEffect} from 'react';
import Product from './Product';

const CategoriesComponent = ({ category }) => {
    const endpoint = `https://dummyjson.com/products/category/${category}`;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(endpoint);
            const data = await response.json();
            setProducts(data.products);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}

            {/* Display the category name */}
            <Text style={styles.categoryName}>
                {category || 'Unknown category'}
            </Text>

            <ScrollView
                contentContainerStyle={{ justifyContent: 'center' }}
                horizontal={true}
                style={styles.scrollview}
            >
                {products.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <Product product={product} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoriesComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 400,
        paddingTop: 20, // Add padding to make space for the category name
    },
    categoryName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollview: {
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    productContainer: {
        marginHorizontal: 10,
    },
});
