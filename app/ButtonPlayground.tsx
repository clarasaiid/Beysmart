// screens/ButtonPlayground.tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { AppButton } from '../design-system/Buttons/Buttons';
import TimeIcon from '../design-system/icons/filled/TimeIcon';

export default function ButtonPlayground() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PRIMARY BUTTONS */}
      <Text style={styles.sectionTitle}>Primary Buttons</Text>
      <AppButton variant="primaryLarge" title="Start" onPress={() => {}} />
      <AppButton variant="primaryMedium" title="Start" onPress={() => {}} />
      <AppButton variant="primarySmall" title="Start" onPress={() => {}} />
      <AppButton variant="primaryPressed" title="Start" onPress={() => {}} />
      <AppButton variant="primaryDisabled" title="Start" disabled onPress={() => {}} />

      {/* SECONDARY BUTTONS */}
      <Text style={styles.sectionTitle}>Secondary Buttons</Text>
      <AppButton variant="secondaryLarge" title="Start" onPress={() => {}} />
      <AppButton variant="secondaryMedium" title="Start" onPress={() => {}} />
      <AppButton variant="secondarySmall" title="Start" onPress={() => {}} />
      <AppButton variant="secondaryPressed" title="Start" onPress={() => {}} />
      <AppButton variant="secondaryDisabled" title="Start" disabled onPress={() => {}} />

      {/* TEXT ONLY */}
      <Text style={styles.sectionTitle}>Text Only</Text>
      <AppButton variant="textOnlyLarge" title="Start" onPress={() => {}} />
<AppButton variant="textOnlyMedium" title="Start" onPress={() => {}} />
<AppButton variant="textOnlySmall" title="Start" onPress={() => {}} />
<AppButton variant="textOnlyPressed" title="Start" onPress={() => {}} />
<AppButton variant="textOnlyDisabled" title="Start" disabled onPress={() => {}} />
      {/* ICON ONLY */}
      <Text style={styles.sectionTitle}>Icon Only</Text>
      <AppButton variant="iconOnlyLarge" icon={<TimeIcon size={20} />} onPress={() => {}} />
<AppButton variant="iconOnlyMedium" icon={<TimeIcon size={20} />} onPress={() => {}} />
<AppButton variant="iconOnlySmall" icon={<TimeIcon size={20} />} onPress={() => {}} />
<AppButton variant="iconOnlyPressed" icon={<TimeIcon size={20} color="#9F4BF2" />} onPress={() => {}} />
<AppButton variant="iconOnlyDisabled" title="Start" disabled onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
