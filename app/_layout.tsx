import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Qebram: require('../assets/fonts/qebram-gxp51.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main index screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* Show auth screens */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* Show main app screens */}
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        {/* Show tabs screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Home flow screens */}
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        {/* Room flow screens */}
        <Stack.Screen name="(room)" options={{ headerShown: false }} />
        {/* Profile flow screens */}
        <Stack.Screen name="(profile actions)" options={{ headerShown: false }} />
        
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
