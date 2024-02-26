import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import AppLogo from "../Images/EcoHaul.png"; // Adjust the import according to your project structure

const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      navigation.navigate('login'); // Adjust as per your navigation setup
    }
  }, [loading, navigation]);

  return (
    <View style={styles.splashScreen} >
      
      <Image source={require('../Images/EcoHaulW.png')} style={styles.appLogo} /> 
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#1C3530",
    
    justifyContent: "center",
    alignItems: "center",
    // Add animation styles if needed
  },
  logoContainer: {
    width: "100%", // Adjust as needed
    height: "100%", // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
    display:"flex",
    // Add animation styles if needed
  },
  appLogo: {
    width: "65%", // Adjust as needed
    height: "15%", 
    marginBottom:"2%"// Adjust as needed
    // Add animation styles if needed
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // Add animation styles if needed
  },
  firstText: {
    color: "#008ed8",
    fontSize: 20,
    marginRight: 4,
    // Add fontFamily if needed
  },
  secondText: {
    color: "#424242",
    fontSize: 20,
    marginLeft: 4,
    // Add fontFamily if needed
  }
});

export default SplashScreen;
