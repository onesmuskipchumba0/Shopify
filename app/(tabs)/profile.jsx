import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {firebase} from '../../firebaseConfig'; // Ensure your Firebase config is imported

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null); // Update user state
      router.push('/auth/Login'); // Redirect to login
    } catch (error) {
      console.error("Logout error", error);
    }
  };
  const openGithub = () =>{
    Linking.openURL('https://github.com/onesmuskipchumba0'); // Replace with your GitHub username
  }
  const openGmail = () =>{
    Linking.openURL('mailto:onesmuskipchumba5@gmail.com'); // Replace with your Gmail address
  }
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image 
          source={{ uri: user?.photoURL || 'https://example.com/your-profile-pic.jpg' }} 
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {user ? `Welcome, ${user.displayName || user.email.split('@')[0]}` : 'Guest'}
        </Text>        
        <Text style={styles.userEmail}>{user?.email || 'Please log in'}</Text>
      </View>

      {/* Profile Options */}
      {user ? (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => router.push('(tabs)/cart')}>
            <Ionicons name="cart-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Order History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => router.push('screens/settings')}>
            <Ionicons name="settings-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => openGithub()}>
            <Ionicons name="logo-github" size={24} color="#555" />
            <Text style={styles.optionText}>Github</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => openGmail()}>
            <Ionicons name="mail-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Get in touch</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Login Button if user is not logged in
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/auth/Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#FF5500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
