import { ImageBackground, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth, firestore } from '../../firebaseConfig'; // Ensure this import is correct
import PrimaryBtn_2 from '../../components/PrimaryBtn-2';
import { Link } from 'expo-router';
import CustomText from '../../components/CustomText';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    // Check for empty fields
    if (!fullname.trim() || !email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    // Validate email format
    if (!isEmailValid(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    try {
      // Create user in Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      // Save additional user info in Firestore
      await firestore.collection('users').doc(user.uid).set({
        fullname,
        email,
        username,
        createdAt: new Date(),
      });
  
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        source={require('../../assets/images/auth/Onboarding-3.png')}
      >
        <View style={{ width: '100%', marginTop: 'auto', height: '100%' }}>
          <View style={{
            width: '100%',
            height: '70%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'start',
            backgroundColor: 'rgba(0,0,0,0.8)',
            marginTop: 'auto',
          }}>
            <ScrollView>
              <Text style={styles.textTitle}>Welcome to Shopify</Text>
              <Text style={styles.textSecondary}>Create an account</Text>
              <CustomText placeholder="Fullname" icon="person" value={fullname} onChangeText={setFullname} />
              <CustomText placeholder="Email" icon="mail" value={email} onChangeText={setEmail} />
              <CustomText placeholder="Username" icon="person" value={username} onChangeText={setUsername} />
              <CustomText placeholder="Password" icon="key" value={password} isPass={true} onChangeText={setPassword} />
              <CustomText placeholder="Confirm Password" icon="key" value={confirmPassword} isPass={true} onChangeText={setConfirmPassword} />

              <View style={styles.subContainer}>
                <PrimaryBtn_2 title="Sign up" onPress={handleSignup} />
                <Text style={styles.text}>
                  Already have an account?
                  <Link href="auth/Login">
                    <Text style={{ color: '#FF5500', fontSize: 18, fontFamily: 'PoppinsRegular' }}> Login</Text>
                  </Link>
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 'auto',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  textSecondary: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  textTitle: {
    color: '#FF5500',
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
    marginTop: 10,
  },
  subContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 70,
  },
});
