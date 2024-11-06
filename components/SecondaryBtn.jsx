import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SecondaryBtn = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title || 'Button'}</Text>
        </TouchableOpacity>
    );
};

export default SecondaryBtn;

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: '#FF5500', // Lighter background for secondary button
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
        borderColor: '#FF5500', // Primary color border for secondary emphasis
        borderWidth: 1,
        marginTop: 'auto',
    },
    text: {
        color: 'white', // Primary color text for emphasis
        fontSize: 18,
        fontWeight: 'bold',
    },
});
