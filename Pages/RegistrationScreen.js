import React from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon 


const RegistrationScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
          <View style={styles.container}>
            <View style={styles.header}>
            
            
            </View>
            
            <View style={styles.imageContainer}>
              <Image source={require('../Images/Logo-Green.svg')} style={styles.imageStyle} />
              
            </View>

            <Text style={styles.subtitle1}>Let's get you started. Create your account </Text>
            <Text style={styles.subtitle2}>to register with us.</Text>
            
            {/* Form Inputs */}
            <TextInput style={styles.input}   placeholderTextColor="#888" // Add this to set the color of the placeholder text
      leftIcon={{ type: 'font-awesome', name: 'user' }} // Specify the icon you want to use
      leftIconContainerStyle={styles.iconStyle} placeholder="Name" />
             <View style={styles.inputWithIcon}>
              <Icon name="user" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#888"
              />
            </View>
            <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

            <Text style={styles.termsText}>By continuing, you agree with our Terms & Conditions</Text>

            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text>Have an account? Sign In</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  backButton: {
    marginRight: 10,
    // You can add more styling for the back button here
  },
  backArrow: {
    fontSize: 20,
    // You can add more styling for the back arrow text/icon here
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // You can add more styling for the title here
  },
  subtitle1: {
    fontSize: 16,
    color: '#666',
    
    textAlign:'center'
    // You can add more styling for the subtitle here
  },
  subtitle2: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign:'center'
    // You can add more styling for the subtitle here
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    // You can add more styling for the terms text here
  },
  registerButton: {
    backgroundColor: '#1C3530',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    // You can add more styling for the register button here
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    // You can add more styling for the register button text here
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    // You can add more styling for the footer text here
  },

  imageContainer: {
    alignItems: 'center',

  },
  imageStyle: {
    width: 100, // Set the width of your image
    height: 50, // Set the height of your image
    borderRadius: 75, // Makes it circular; adjust as needed
  },
  
});


export default RegistrationScreen;
