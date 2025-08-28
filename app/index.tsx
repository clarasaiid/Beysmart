import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../design-system/colors/colors';

export default function Index() {
  useEffect(() => {
    // For now, redirect to auth flow
    // In a real app, you would check authentication status here
    // and redirect accordingly
    router.replace('/(auth)/test');
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size="large" color={colors.primary.base} />
    </View>
  );
}
