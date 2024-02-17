import React from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon 


const Logincreen = () => {
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
            <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

            <Text style={styles.termsText1}>By continuing, you agree with our</Text>

            <Text style={styles.termsText2}> Terms & Conditions</Text>

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
    backgroundColor: '#fff', // or the color that matches your design
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures that the scroll view content fills the space
  },
  keyboardView: {
    flex: 1, // Ensures that the keyboard view takes up the full space
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Centers the content vertically
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
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 13,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ECECEC', 
    
   
    // You can add more styling for the input fields here
  },
  termsText1: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  termsText2: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '600',
    
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
    height: 150, // Set the height of your image
    borderRadius: 75, // Makes it circular; adjust as needed
  },
  
});


export default Logincreen;
