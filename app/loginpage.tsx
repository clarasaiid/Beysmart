import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { LOGIN_STRINGS } from '@/constants/Login';
import { AppButton, colors, MailIcon, PhoneIcon, BackIcon, Spacing, Typography } from '@/design-system';


export default function LoginMethodScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <AppButton
          variant="iconOnlyMedium"
          icon={<BackIcon />}
          onPress={() => router.back()}
        />
      </View>

      <View style={styles.content}>
        <Typography variant="h1" color={colors.text} style={styles.title}>
          {LOGIN_STRINGS.methodSelect.title}
        </Typography>
        <Typography variant="body" color={colors.secondaryText} style={styles.subtitle}>
          {LOGIN_STRINGS.methodSelect.subtitle}
        </Typography>

        <View style={styles.actions}>
          <AppButton
            variant="primaryLarge"
            title={LOGIN_STRINGS.methodSelect.actions.loginWithEmail}
            icon={<MailIcon />}
            onPress={() => { router.push('/emaillogin') }}
          />
          <View style={{ height: Spacing.md }} />
          <AppButton
            variant="primaryLarge"
            title={LOGIN_STRINGS.methodSelect.actions.loginWithPhone}
            icon={<PhoneIcon />}
            onPress={() => { router.push('/phonelogin') }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Typography variant="caption" color={colors.secondaryText} style={styles.securityNote}>
           {LOGIN_STRINGS.methodSelect.accessibility.securityNote}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: Spacing.lg,
  },
  header: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  actions: {
    width: '100%',
    maxWidth: 300,
  },
  footer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  securityNote: {
    textAlign: 'center',
  },
});
