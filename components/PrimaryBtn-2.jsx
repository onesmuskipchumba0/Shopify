import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const PrimaryBtn_2 = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title || 'Button'}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn_2;

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
    marginTop: 'auto',
  },
  text: {
    color: '#FF5500',
    fontSize: 18,
  }
});
