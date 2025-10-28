import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Linking, Alert, AppRegistry, Platform, ImageBackground, ActivityIndicator, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PAYPAL_LINK = 'https://paypal.me/jeremoooo';
const VENMO_APP = 'venmo://paycharge?txn=pay&recipients=jeremoo';
const VENMO_WEB = 'https://venmo.com/u/jeremoo';
const CASH_APP = 'https://cash.app/$jeremooooo';

// Using a smaller, optimized version of the image for faster loading
const BACKGROUND_IMAGE = 'https://i.ibb.co/9kxyZMXF/IMG-2041-Original.jpg?w=1200&h=auto&q=80';

// Get screen dimensions for cat movement
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

async function openLink(url, fallbackUrl) {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      return;
    }
    if (fallbackUrl) {
      await Linking.openURL(fallbackUrl);
      return;
    }
    Alert.alert('Not supported', 'This link is not supported on your device.');
  } catch (error) {
    if (fallbackUrl) {
      try {
        await Linking.openURL(fallbackUrl);
        return;
      } catch (e) {}
    }
    Alert.alert('Error', 'Could not open the link.');
  }
}

export default function App() {
  const [imageLoaded, setImageLoaded] = useState(Platform.OS === 'web'); // Web loads immediately
  
  // Cat animation values
  const catX = useRef(new Animated.Value(screenWidth / 2)).current;
  const catY = useRef(new Animated.Value(screenHeight / 2)).current;
  const catScale = useRef(new Animated.Value(1)).current;
  
  // Use ImageBackground for mobile, regular View for web
  const BackgroundComponent = Platform.OS === 'web' ? View : ImageBackground;
  const backgroundProps = Platform.OS === 'web' ? {} : { 
    source: { uri: BACKGROUND_IMAGE }, 
    resizeMode: 'cover',
    onLoad: () => setImageLoaded(true),
    onError: () => setImageLoaded(true) // Show content even if image fails to load
  };

  // Function to move cat to tap location
  const moveCatTo = (x, y) => {
    // Keep cat within screen bounds
    const boundedX = Math.max(20, Math.min(screenWidth - 40, x));
    const boundedY = Math.max(50, Math.min(screenHeight - 100, y));
    
    // Scale animation for running effect
    Animated.sequence([
      Animated.timing(catScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(catScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    // Move cat to new position
    Animated.parallel([
      Animated.timing(catX, {
        toValue: boundedX,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(catY, {
        toValue: boundedY,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Handle screen tap
  const handleScreenTap = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    moveCatTo(locationX, locationY);
  };

  return (
    <BackgroundComponent style={styles.container} {...backgroundProps}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              {!imageLoaded && Platform.OS !== 'web' && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#ffffff" />
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              )}
              <Text style={styles.title}>i cannot afford my tuition</Text>
              <TouchableOpacity style={styles.button} onPress={() => openLink(PAYPAL_LINK)}>
                <Text style={styles.buttonText}>PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => openLink(VENMO_APP, VENMO_WEB)}>
                <Text style={styles.buttonText}>Venmo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => openLink(CASH_APP)}>
                <Text style={styles.buttonText}>Cash App</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          
          {/* Cat Sprite */}
          <Animated.View 
            style={[
              styles.cat,
              {
                transform: [
                  { translateX: catX },
                  { translateY: catY },
                  { scale: catScale }
                ]
              }
            ]}
          >
            <Text style={styles.catEmoji}>🐱</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundComponent>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#1a1a1a', // Fallback background color
    ...(Platform.OS === 'web' ? {
      backgroundImage: `url(${BACKGROUND_IMAGE})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    } : {})
  },
  overlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)' // Semi-transparent overlay for better text readability
  },
  safeArea: {
    flex: 1
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { 
    fontSize: 28, 
    fontWeight: '600', 
    color: '#ffffff', 
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  button: { 
    width: '100%', 
    maxWidth: 320, 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    borderRadius: 10, 
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  buttonText: { 
    textAlign: 'center', 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500'
  },
  cat: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none'
  },
  catEmoji: {
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  }
});

// Register the main component
AppRegistry.registerComponent('main', () => App);
