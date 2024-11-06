import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../firebaseConfig'; // Adjust path accordingly
import { useRouter } from 'expo-router'; // Import the useRouter hook
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged from firebase/auth

const TabsLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Redirect to the login screen if not logged in
        router.push('/auth');  // Adjust the path if needed (e.g., /auth is the login screen)
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [router]); // Add router as a dependency

  if (isLoggedIn === null) {
    // Show a loading indicator while checking authentication
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
  );
  }

  if (!isLoggedIn) {
    // The redirection happens in the effect, so no need to return anything here
    return null;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'categories':
              iconName = focused ? 'menu' : 'menu-outline';
              break;
            case 'cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabsLayout;
