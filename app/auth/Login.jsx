import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Alert } from 'react-native';
import PrimaryBtn_2 from '../../components/PrimaryBtn-2';
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
        resizeMode='cover'
        style={styles.imageBackground}
        source={require('../../assets/images/auth/Onboarding-3.png')}
      >
        <View style={styles.innerContainer}>
          <View style={styles.authContainer}>
            <Text style={styles.textTitle}>Welcome to Shopify</Text>
            <Text style={styles.textSecondary}>Login to your account</Text>

            <CustomText
            placeholder="Email"
            icon="person"
            value={email}
            onChangeText={setEmail}
          />
          <CustomText
            placeholder="Password"
            icon="key"
            isPass={true}  // Correct prop name for password field
            value={password}
            onChangeText={setPassword}
          />


            <View style={styles.subContainer}>
              <PrimaryBtn_2 title="Login" onPress={handleLogin} />
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: 'auto',
    padding: 20,
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
});
