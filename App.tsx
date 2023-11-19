import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '_locales';
import { StackNavigator } from '_navigations';
import { useFonts } from 'expo-font';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const App = () => {
  useFonts({
    'Ubuntu-Bold': require('./src/assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-Light': require('./src/assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Medium': require('./src/assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Regular': require('./src/assets/fonts/Ubuntu-Regular.ttf'),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <StackNavigator />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </SafeAreaProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
