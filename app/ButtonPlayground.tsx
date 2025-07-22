// screens/ButtonPlayground.tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { AppButton } from '../design-system/Buttons/Buttons';
import { Ionicons } from '@expo/vector-icons'; // if using Expo

export default function ButtonPlayground() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Button Playground</Text>

      {/* Primary Buttons */}
      <AppButton
        variant="primaryLarge"
        title="start"
        onPress={() => console.log('Primary Large')}
      />

      <AppButton
        variant="primaryMedium"
        title="save"
        onPress={() => console.log('Primary Medium')}
      />

      <AppButton
        variant="primarySmall"
        title="Primary Small"
        onPress={() => console.log('Primary Small')}
      />

      <AppButton
        variant="primaryPressed"
        title="Primary Pressed"
        onPress={() => console.log('Primary Pressed')}
      />

      <AppButton
        variant="primaryDisabled"
        title="Primary Disabled"
        disabled={true}
      />

      {/* Secondary Buttons */}
      <AppButton
        variant="secondaryLarge"
        title="Secondary Large"
        onPress={() => console.log('Secondary Large')}
      />

      <AppButton
        variant="secondaryMedium"
        title="Secondary Medium"
        onPress={() => console.log('Secondary Medium')}
      />

      <AppButton
        variant="secondarySmall"
        title="Secondary Small"
        onPress={() => console.log('Secondary Small')}
      />

      <AppButton
        variant="secondaryPressed"
        title="Secondary Pressed"
        onPress={() => console.log('Secondary Pressed')}
      />

      <AppButton
        variant="secondaryDisabled"
        title="Secondary Disabled"
        disabled={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
