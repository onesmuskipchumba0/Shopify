import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../assets/images/auth/Onboarding-3.png')}
      >
        <View style={styles.subContainer}>
          {/* Replacing PrimaryBtn with TouchableOpacity */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Navigate to Login screen
              router.push('auth/Login');
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.text}>
            Don't have an account?
            <Link href="auth/Signup">
              <Text style={styles.linkText}> Sign Up</Text>
            </Link>
          </Text>

          
        </View>
      </ImageBackground>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 'auto',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  subContainer: {
    marginTop: 'auto',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 120,
  },
  button: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#FF5500',
    fontSize: 18,
  },
  linkText: {
    color: '#FF5500',
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
  },
});
