import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationService from './src/services/notificationService';

export default function App() {
  React.useEffect(() => {
    NotificationService.init();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}