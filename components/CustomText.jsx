import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const CustomText = ({ placeholder, isPass, icon, value, onChangeText }) => {
    const [seePass, setSeePass] = useState(isPass); // Initial value based on isPass prop

    return (
        <View style={styles.container}>
            <Ionicons name={icon || 'person'} color={'rgba(255,255,255,0.8)'} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={seePass}
                placeholderTextColor="rgba(255,255,255,0.8)"
                value={value} // Bind the input value to the state
                onChangeText={onChangeText} // Update the state on text change
            />
            {isPass && (
                <TouchableOpacity onPress={() => setSeePass(!seePass)}>
                    <Ionicons
                        name={seePass ? 'eye' : 'eye-off'}
                        color={'rgba(255,255,255,0.8)'}
                        size={20}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomText;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#fff',
        fontFamily: 'PoppinsRegular',
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
});
