import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("seller");
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {!isLoggedIn
        ?
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        :
        (role === 'seller' 
         ?
         <Stack.Screen name="(seller)" options={{ headerShown: false }} />
         :
         <Stack.Screen name="(buyer)" options={{ headerShown: false }} />
        )
        }
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
