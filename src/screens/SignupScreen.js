import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const SignupScreen = ({ navigation }) => {
  // State to hold form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to hold error messages
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Form validation function
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { username: '', email: '', password: '' };

    // Check if all fields are filled
    if (!username) {
      newErrors.username = 'Username is required';
      formIsValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
      formIsValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle sign up button press
  const handleSignup = () => {
    if (validateForm()) {
      // Save user data in local storage
      const userData = { username, email, password };
      localStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to login screen upon successful sign up
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Sign Up</Text>

      {/* Username input */}
      <TextInput
        style={commonStyles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username ? <Text style={{ color: 'red' }}>{errors.username}</Text> : null}

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

      {/* Sign up button */}
      <TouchableOpacity style={commonStyles.button} onPress={handleSignup}>
        <Text style={commonStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigation to login screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ textAlign: 'center', marginTop: 10, color: '#4CAF50' }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
