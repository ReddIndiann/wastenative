import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigations from './Navigations';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigations />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
