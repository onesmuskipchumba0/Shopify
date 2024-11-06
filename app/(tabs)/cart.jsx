import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    Modal,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import { firestore } from "../../firebaseConfig";
  import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
  import { Ionicons } from "@expo/vector-icons";
  import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
  
  const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [orderPlaced, setOrderPlaced] = useState(false); // State to track if the order is placed
  
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "cartItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
  
    const deleteItem = async (id) => {
      try {
        const docRef = doc(firestore, "cartItems", id.toString());
        await deleteDoc(docRef);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } catch (e) {
        console.error("Error deleting item: ", e.message);
        setError(e.message);
      }
    };
  
    const deleteAllItems = async () => {
      try {
        // Loop through all cart items and delete them from Firestore
        const batch = firestore.batch();
        cartItems.forEach((item) => {
          const docRef = doc(firestore, "cartItems", item.id.toString());
          batch.delete(docRef);
        });
        await batch.commit(); // Commit the batch operation
        console.log("All items deleted successfully.");
        setCartItems([]); // Clear the local cart state
      } catch (e) {
        console.error("Error deleting all items: ", e.message);
        setError(e.message);
      }
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };
  
    const openReceiptModal = () => {
      setShowModal(true); // Open the modal
    };
  
    const closeReceiptModal = () => {
      setShowModal(false); // Close the modal
      deleteAllItems(); // Delete all items from Firestore and clear local state
      setOrderPlaced(true); // Set the order placed message
    };
  
    const openCashOutMessage = () => {
      if (orderPlaced) {
        return <Text style={styles.orderMessage}>{cartItems > 0 && `Your items are on the way!`}</Text>;
      }
      return null;
    };
  
    useFocusEffect(
      useCallback(() => {
        fetchCartItems(); // Re-fetch cart items every time the screen is focused
      }, [])
    );
  
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
  
        {/* Show cart items if there are any */}
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            extraData={cartItems}
            renderItem={({ item }) =>
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
            }
          />
        ) : (
          <Text style={styles.noItemsText}>Your cart is empty!</Text>
        )}
  
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: KSH {calculateTotal()}</Text>
          <TouchableOpacity style={styles.cashoutButton} onPress={openReceiptModal}>
            <Text style={styles.cashoutText}>Cash Out</Text>
          </TouchableOpacity>
        </View>
  
        {openCashOutMessage()}
  
        {/* Receipt Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={closeReceiptModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Receipt</Text>
              <View style={styles.receiptDetails}>
                <Text style={styles.receiptText}>Items:</Text>
                {cartItems.map((item) => (
                  <Text key={item.id} style={styles.receiptText}>
                    {item.title} - KSH {item.price.toFixed(2)}
                  </Text>
                ))}
              </View>
              <Text style={styles.modalTotal}>Total: KSH {calculateTotal()}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeReceiptModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default Cart;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "white",
      marginTop: StatusBar.currentHeight,
    },
    cartItem: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      padding: 10,
      backgroundColor: "#f9f9f9",
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
      fontWeight: "bold",
    },
    price: {
      fontSize: 14,
      color: "#555",
    },
    totalContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      alignItems: "center",
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    cashoutButton: {
      marginTop: 10,
      paddingVertical: 12,
      paddingHorizontal: 40,
      backgroundColor: "#007BFF",
      borderRadius: 5,
      elevation: 5, // Shadow effect for Android
    },
    cashoutText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      fontSize: 16,
    },
  
    // Modal Styles
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
    },
    receiptDetails: {
      marginVertical: 10,
    },
    receiptText: {
      fontSize: 16,
      color: "#333",
    },
    modalTotal: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#FF6347",
      borderRadius: 5,
    },
    closeButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  
    // New styles for the order message
    orderMessage: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#4CAF50",
      textAlign: "center",
      marginTop: 20,
    },
  
    noItemsText: {
      fontSize: 18,
      color: "#888",
      textAlign: "center",
      marginTop: 50,
    },
  });
  