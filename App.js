import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Linking, Alert, AppRegistry, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PAYPAL_LINK = 'https://paypal.me/jeremoooo';
const VENMO_APP = 'venmo://paycharge?txn=pay&recipients=jeremoo';
const VENMO_WEB = 'https://venmo.com/u/jeremoo';
const CASH_APP = 'https://cash.app/$jeremooooo';

// Using a smaller, optimized version of the image for faster loading
const BACKGROUND_IMAGE = 'https://i.ibb.co/9kxyZMXF/IMG-2041-Original.jpg?w=1200&h=auto&q=80';

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
  
  // Use ImageBackground for mobile, regular View for web
  const BackgroundComponent = Platform.OS === 'web' ? View : ImageBackground;
  const backgroundProps = Platform.OS === 'web' ? {} : { 
    source: { uri: BACKGROUND_IMAGE }, 
    resizeMode: 'cover',
    onLoad: () => setImageLoaded(true),
    onError: () => setImageLoaded(true) // Show content even if image fails to load
  };

  return (
    <BackgroundComponent style={styles.container} {...backgroundProps}>
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {!imageLoaded && Platform.OS !== 'web' && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            )}
            <Text style={styles.title}>please i cannot afford my tuition</Text>
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
      </View>
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
  }
});

// Register the main component
AppRegistry.registerComponent('main', () => App);
