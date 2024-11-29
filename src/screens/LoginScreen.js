import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to save user actions
  const saveUserAction = async (action) => {
    try {
      let actions = await AsyncStorage.getItem('userActions');
      actions = actions ? JSON.parse(actions) : [];
      actions.push(action);
      await AsyncStorage.setItem('userActions', JSON.stringify(actions));
    } catch (error) {
      console.log('Error saving user action:', error);
    }
  };

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required!');
      return;
    }

    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (!storedUserData) {
        Alert.alert('Error', 'No user data found! Please sign up first.');
        saveUserAction({ email, status: 'failed', reason: 'No user data found' });
        return;
      }

      const { email: storedEmail, password: storedPassword } = JSON.parse(storedUserData);

      if (email === storedEmail && password === storedPassword) {
        Alert.alert('Success', 'Login successful!');
        saveUserAction({ email, status: 'success', timestamp: new Date().toISOString() });
        navigation.navigate('Home'); // Navigate to the Home screen
      } else {
        Alert.alert('Error', 'Invalid email or password!');
        saveUserAction({ email, status: 'failed', reason: 'Invalid credentials' });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve user data. Please try again!');
      saveUserAction({ email, status: 'failed', reason: 'Error retrieving data' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.prompt}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prompt: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
