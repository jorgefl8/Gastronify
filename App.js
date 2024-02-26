import React from 'react';
import Main from './src/screens/Main.jsx';
import { NativeRouter } from 'react-router-native'

export default function App() {
  return (
    <NativeRouter>
      <Main/>
    </NativeRouter>
    );
}

