import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ScreenLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='[id]' options={{title:`Category`}}/>
        <Stack.Screen name='settings' options={{title:`Settings`}}/>
    </Stack>
  )
}

export default ScreenLayout