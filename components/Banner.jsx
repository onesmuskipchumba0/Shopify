import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = () => {
  return (
    <View>
      <Image
        source={require('../assets/images/home/Banner-1.png')}
        style={{width: 400, height: 200}}
        resizeMode='cover'
      >
      </Image>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})