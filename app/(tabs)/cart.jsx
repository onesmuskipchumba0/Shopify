import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'cartItems'));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCartItems(items);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
      try {
          await deleteDoc(doc(firestore, 'cartItems', id));
          const updatedItems = cartItems.filter(item => item.id !== id);
          setCartItems(updatedItems); // Set new array directly
      } catch (e) {
          setError(e.message);
      }
  };
  
  

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
    data={cartItems}
    keyExtractor={item => item.id}
    extraData={cartItems} // Add this line to force re-render on state update
    renderItem={({ item }) => (
        item && (
            <View style={styles.cartItem}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Price: KSH {item.price.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
            </View>
        )
    )}
/>


            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: KSH {calculateTotal()}</Text>
                <TouchableOpacity style={styles.cashoutButton}>
                    <Text style={styles.cashoutText}>Cash Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#555',
    },
    totalContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cashoutButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    cashoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
