import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const SearchBar = () => {
  const [input, setInput] = useState('')
  
  const handleInputChange = (text) => {
    setInput(text)
  }
  
  return (
    <View style={styles.container}>
      <Link href={`search/${input}`}>
        <Ionicons name='search-outline' size={18}/>
      </Link>
      <TextInput
      value={input}
      onChangeText={handleInputChange} 
      style={styles.input} 
      placeholder='Search products'>
      </TextInput>

    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f2f2f2',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 5,
      width:'90%',
      flexDirection:'row',
      alignItems:'center',
      marginTop:StatusBar.currentHeight,
      marginVertical:20,
      borderRadius:20,
    },
    input: {
        height: 30,
        width:'80%',
        paddingHorizontal: 16,
        fontSize: 16,
    }
})