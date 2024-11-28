// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const userName = 'Nikesh';
  const courses = [
    {
      id: '1',
      title: 'React Native Fundamentals',
      description: 'Learn how to build mobile apps using React Native.',
    },
    {
      id: '2',
      title: 'Introduction to JavaScript',
      description: 'Understand the basics of JavaScript and its syntax.',
    },
    // Add more courses here as needed
  ];

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Educational App</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <Text style={styles.subHeading}>Explore courses to enhance your skills</Text>
      </View>

      {/* Search Bar for Courses */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for courses..."
        placeholderTextColor="#888"
      />

      {/* Courses List */}
      <View style={styles.courseList}>
        {courses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseCard}
            onPress={() => navigation.navigate('Detail', { course })} // Pass course data
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateCourse')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for Home Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Handle status bar for iOS
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeSection: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  courseList: {
    marginBottom: 80, // To avoid overlap with FAB
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // For Android shadow
  },
  fabText: {
    fontSize: 36,
    color: '#fff',
  },
});

export default HomeScreen;
