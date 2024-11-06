import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBtn from '../../components/PrimaryBtn'
import { Link } from 'expo-router'
const index = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
      resizeMode='cover'
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={require('../../assets/images/auth/Onboarding-3.png')}>
        <View style={styles.subContainer}>
          <PrimaryBtn title='Login' href={'auth/Login'}/>
          <Text style={styles.text}>
            Don't have an account?
            <Link href='auth/Signup'>
              <Text style={{color:'#FF5500', fontSize:18, fontFamily:'PoppinsRegular'}}> Sign Up</Text>
            </Link>
            </Text>
            <Link style={{marginTop:40}} href='(tabs)'>
              <Text style={{color:'white', fontSize:16}}>Skip</Text>
            </Link>
        </View>
      </ImageBackground>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
      color: '#fff',
      fontSize: 18,
      marginBottom: 'auto',
      fontFamily:'PoppinsRegular',
      textAlign:'center'
    },
    subContainer:{
      marginTop:'auto',
      width: '100%',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:120
    }
})