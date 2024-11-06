import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SearchLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='[query]' options={{title:"Search",headerShown:false}}/>
    </Stack>
  )
}

export default SearchLayout