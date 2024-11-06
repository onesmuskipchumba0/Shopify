import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProductsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='[product]' options={{title:"Product",headerShown:false}}/>
    </Stack>
  )
}

export default ProductsLayout