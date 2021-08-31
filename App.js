import React from 'react';
import Stack from './src/navigation/Stack';
import {AppProvider} from './src/component/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Stack />
    </AppProvider>
  );
}
