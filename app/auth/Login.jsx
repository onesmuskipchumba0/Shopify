import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import CustomText from '../../components/CustomText';
import { auth } from '../../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'You are logged in!');
      router.push('(tabs)');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your email or sign up.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={require('../../assets/images/auth/Onboarding-3.png')}
      >
        <View style={styles.innerContainer}>
          <View style={styles.authContainer}>
            <Text style={styles.textTitle}>Welcome to Shopify</Text>
            <Text style={styles.textSecondary}>Login to your account</Text>

            {/* CustomText components for Email and Password */}
            <CustomText
              placeholder="Email"
              icon="person"
              value={email}
              onChangeText={setEmail} // Set email state when text changes
            />
            <CustomText
              placeholder="Password"
              icon="key"
              isPass={true} // Password field (secure entry)
              value={password}
              onChangeText={setPassword} // Set password state when text changes
            />

            <View style={styles.subContainer}>
              {/* Replacing the PrimaryBtn_2 component with a custom button */}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.text}>
                Don't have an account?
                <Link href="auth/Signup">
                  <Text style={styles.linkText}> Sign Up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    marginTop: 'auto',
    height: '100%',
  },
  authContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: 'auto',
    padding: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  textTitle: {
    color: '#FF5500',
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
    marginTop: 10,
  },
  textSecondary: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    marginBottom: 'auto',
  },
  linkText: {
    color: '#FF5500',
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
  },
  subContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 70,
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
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FF5500',
    fontSize: 18,
  },
});
