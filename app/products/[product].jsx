import { StyleSheet, Text, View, ActivityIndicator, Modal, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import SecondaryBtn from '../../components/SecondaryBtn';
import { firestore } from '../../firebaseConfig'; // Adjust the path to your firebase file

const Product = () => {
  const { product } = useLocalSearchParams();
  const endpoint = `https://dummyjson.com/products/${product}`;
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // New state for total price

  const getExchangeRate = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/CUP');
      const data = await response.json();
      setExchangeRate(data.rates);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProductData(data);
      const priceInKES = data.price * (exchangeRate?.KES || 1);
      setTotalAmount(priceInKES); // Set the total amount based on exchange rate
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (productData) {
      const cartItem = {
        id: productData.id,
        title: productData.title,
        price: productData.price * (exchangeRate?.KES || 1),
        thumbnail: productData.thumbnail,
      };

      try {
        await firestore.collection('cartItems').doc(productData.id.toString()).set(cartItem);
        Alert.alert('Success', 'Product added to cart!');
      } catch (error) {
        console.error("Error adding to cart: ", error);
        Alert.alert('Error', 'Failed to add item to cart');
      }
    }
  };

  const handlePurchase = () => {
    // Set the modal visibility to true when "Purchase Now" is clicked
    setModalVisible(true);
  };

  const handleConfirmOrder = () => {
    // After confirming the order, display a confirmation message
    setOrderConfirmed(true);
    // Close the modal after the order is confirmed
    setModalVisible(false);

    // Here you can clear the cart or perform other actions
    clearCart();
  };

  const clearCart = () => {
    // Implement logic to clear cart from state or Firestore
    console.log('Cart cleared');
    Alert.alert('Your order is on the way!');
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && productData && (
        <ScrollView>
          <View style={styles.productCard}>
            <Image
              resizeMode='contain'
              source={{ uri: productData.thumbnail }}
              style={styles.image}
            />
            <Text style={styles.productTitle}>{productData.title}</Text>
            <Text style={styles.productPrice}>
              Price: KSH {totalAmount.toFixed(2)}
            </Text>
            <Text style={styles.productCategory}>Category: {productData.category}</Text>
            <Text style={styles.productDescription}>{productData.description}</Text>
            <SecondaryBtn title={"Add to cart"} onPress={handleAddToCart} />
            <TouchableOpacity style={styles.purchaseBtn} onPress={handlePurchase}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Purchase Now</Text>
            </TouchableOpacity>
            {/* Modal for Confirmation */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  {!orderConfirmed ? (
                    <>
                      <Text style={styles.modalText}>Total Price: KSH {totalAmount.toFixed(2)}</Text>
                      <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={handleConfirmOrder}
                      >
                        <Text style={styles.confirmBtnText}>Confirm Order</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={styles.modalText}>Order on your way!</Text>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  productCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 10,
    borderRadius: 8,
  },
  purchaseBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderColor: 'black',
    borderWidth: 0.4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmBtn: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

