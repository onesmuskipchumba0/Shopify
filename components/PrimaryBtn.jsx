import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const PrimaryBtn = ({title,href,onCLickHandler}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onCLickHandler()}>
        <Link href={href || null}>
        <Text style={styles.text}>{title || 'Button'}</Text>
        </Link>
    </TouchableOpacity>
  )
}

export default PrimaryBtn

const styles = StyleSheet.create({
    container: {
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
        marginTop:'auto',
    },
    text: {
        color: '#FF5500',
        fontSize: 18
    }
})