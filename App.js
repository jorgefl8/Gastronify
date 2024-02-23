import React from 'react';
import Main from './src/components/Main.jsx';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import theme from './src/theme.js';

export default function App() {
  return (
    <SafeAreaProvider >
      <SafeAreaView>
        <StatusBar backgroundColor={theme.appBar.primary}/>
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

