import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PAYPAL_LINK = 'https://paypal.me/jeremoooo';
const VENMO_APP = 'venmo://paycharge?txn=pay&recipients=jeremoo';
const VENMO_WEB = 'https://venmo.com/u/jeremoo';
const CASH_APP = 'https://cash.app/$jeremooooo';

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '600', color: '#111', marginBottom: 24 },
  button: { width: '100%', maxWidth: 320, backgroundColor: '#111', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, marginBottom: 12 },
  buttonText: { textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '600' }
});


