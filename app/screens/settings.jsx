import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const SettingsScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
 
  return (
    <View style={styles.container}>
      {/* Profile Settings */}
      <TouchableOpacity style={styles.option} onPress={() => router.push('/profile-settings')}>
        <Ionicons name="person-outline" size={24} color="#555" />
        <Text style={styles.optionText}>Profile Settings</Text>
      </TouchableOpacity>

      {/* Notification Settings */}
      <View style={styles.option}>
        <Ionicons name="notifications-outline" size={24} color="#555" />
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          style={styles.switch}
        />
      </View>

      

      {/* Security Settings */}
      <TouchableOpacity style={styles.option} onPress={() => router.push('/security-settings')}>
        <Ionicons name="lock-closed-outline" size={24} color="#555" />
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.option} onPress={() => router.push('screens/about')}>
        <Ionicons name="information-circle-outline" size={24} color="#555" />
        <Text style={styles.optionText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default SettingsScreen;
