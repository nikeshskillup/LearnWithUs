import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const LoginScreen = ({ navigation }) => {
  // State to hold input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State to hold error messages
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Form validation function
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: '', password: '' };

    // Check if all fields are filled
    if (!email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle login button press
  const handleLogin = () => {
    if (validateForm()) {
      // Retrieve user data from local storage
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData && userData.email === email && userData.password === password) {
        // Navigate to the main screen upon successful login
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        // Show error message if credentials are incorrect
        Alert.alert('Error', 'Invalid email or password', [
          { text: 'Try Again' },
        ]);
      }
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Login</Text>

      {/* Email input */}
      <TextInput
        style={commonStyles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}

      {/* Password input */}
      <TextInput
        style={commonStyles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? <Text style={{ color: 'red' }}>{errors.password}</Text> : null}

      {/* Login button */}
      <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
        <Text style={commonStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigation to signup screen */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ textAlign: 'center', marginTop: 10, color: '#4CAF50' }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
