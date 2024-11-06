import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name='search-outline' size={18}/>
      <TextInput style={styles.input} placeholder='Search products'>
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