import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { LOGIN_STRINGS } from '@/constants/Login';
import { ERROR_MESSAGES } from '@/constants/errors';
import { AppButton, BackIcon, colors, MobileIcon, Spacing, Typography } from '@/design-system';
import { Grid, Margin, Padding } from '@/design-system/Layout';
import TextField from '@/design-system/inputs/TextField';
import { authAPI, PhoneLoginRequest } from '@/services';

export default function PhoneLoginScreen() {
  const router = useRouter();

  const [country, setCountry] = useState(LOGIN_STRINGS.phoneLogin.defaults.country);
  const [dialCode, setDialCode] = useState<string>(LOGIN_STRINGS.phoneLogin.defaults.dialCode);
  const [phone, setPhone] = useState('');
  const [countryQuery, setCountryQuery] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // full list
  const { COUNTRIES } = require('@/constants/countries');

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c: { name: string; dial: string }) => c.name.toLowerCase().includes(q) || c.dial.includes(q));
  }, [countryQuery, COUNTRIES]);

  const canContinue = phone.trim() && phone.replace(/\D/g, '').length >= 9 && phone.replace(/\D/g, '').length <= 15;

  const handleSendCode = async () => {
    if (!canContinue) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const phoneData: PhoneLoginRequest = {
        phone_number: `${dialCode}${phone}`,
        country_code: dialCode,
      };

      const response = await authAPI.phoneLogin(phoneData);

      if (response.success) {
        // Phone login initiated successfully
        router.push({ pathname: '/verifycode', params: { phone: `${dialCode}${phone}`, dialCode } });
      } else {
        // Phone login failed
        setError(response.error || ERROR_MESSAGES.OTP_SEND_FAILED);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(ERROR_MESSAGES.INVALID_PHONE_FORMAT);
      } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
        setError(ERROR_MESSAGES.NETWORK_ERROR);
      } else {
        setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back + top security note */}
      <View style={styles.headerRow}>
        <AppButton
          variant="iconOnlyMedium"
          icon={<BackIcon />}
          onPress={() => router.back()}
        />
        <Typography variant="caption" color={colors.secondaryText} style={{ marginLeft: Grid.gutterWidth / 2 }}>
          🔒 {LOGIN_STRINGS.phoneLogin.accessibility.securityNote}
        </Typography>
      </View>

      {/* Icon circle */}
      <View style={styles.heroIcon}>
        <View style={styles.heroDot}>
          <MobileIcon color={colors.text} />
        </View>
      </View>

      {/* Title & subtitle */}
      <View style={styles.centerContent}>
        <Typography variant="h1" color={colors.text} style={styles.title}>
          {LOGIN_STRINGS.phoneLogin.title}
        </Typography>
        <Typography variant="body" color={colors.secondaryText} style={styles.subtitle}>
          {LOGIN_STRINGS.phoneLogin.subtitle}
        </Typography>
      </View>

      {/* Country selector (static for now) */}
      <View style={Margin.betweenSections}>
        <Typography variant="body" style={{ marginBottom: Spacing.xs }}>
          {LOGIN_STRINGS.phoneLogin.fields.countryLabel}
        </Typography>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.countryPicker}
          onPress={() => setShowCountryModal(true)}
        >
          <Typography variant="body" color={colors.text}>{country}</Typography>
          <Typography variant="body" color={colors.secondaryText}>▾</Typography>
        </TouchableOpacity>
      </View>

      {/* Phone number field with dial code box */}
      <View style={Margin.betweenSections}>
        <Typography variant="body" style={{ marginBottom: Spacing.xs }}>
          {LOGIN_STRINGS.phoneLogin.fields.phoneLabel}
        </Typography>
        <View style={styles.phoneRow}>
          <TextField
            value={dialCode}
            onChangeText={setDialCode}
            placeholder={LOGIN_STRINGS.phoneLogin.fields.dialCodePlaceholder}
            containerStyle={styles.dialCodeField}
          />
          <View style={{ width: Grid.columnGap / 2 }} />
          <TextField
            value={phone}
            onChangeText={setPhone}
            placeholder={LOGIN_STRINGS.phoneLogin.fields.phonePlaceholder}
            containerStyle={{ width: 320 }}
          />
        </View>
      </View>

      {/* Error message */}
      {error && (
        <View style={styles.errorContainer}>
          <Typography variant="caption" color={colors.error}>
            {error}
          </Typography>
        </View>
      )}
      
      <View style={{ marginTop: Grid.rowGap }}>
        <AppButton
          variant="primaryLarge"
          title={isLoading ? "Sending..." : LOGIN_STRINGS.phoneLogin.actions.sendCode}
          onPress={handleSendCode}
          disabled={!canContinue || isLoading}
        />
      </View>

      {/* Bottom security note */}
      <View style={styles.footer}>
        <Typography variant="caption" color={colors.secondaryText}>
          🔒 {LOGIN_STRINGS.phoneLogin.accessibility.securityNote}
        </Typography>
      </View>

      {/* Country Selector Modal */}
      <Modal visible={showCountryModal} transparent animationType="fade" onRequestClose={() => setShowCountryModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Typography variant="h2" color={colors.text} style={{ marginBottom: Spacing.sm }}>Select Country/Region</Typography>
            <TextInput
              placeholder="Search country or dial code"
              placeholderTextColor={colors.disabled}
              value={countryQuery}
              onChangeText={setCountryQuery}
              style={styles.searchInput}
            />
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setCountry(item.name);
                    setDialCode(item.dial);
                    setShowCountryModal(false);
                  }}
                >
                  <Typography variant="body" color={colors.text}>{item.name}</Typography>
                  <Typography variant="body" color={colors.secondaryText}>{item.dial}</Typography>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 320 }}
            />
            <View style={{ marginTop: Spacing.sm }}>
              <AppButton variant="secondaryMedium" title="Close" onPress={() => setShowCountryModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: Grid.gutterWidth,
    ...Padding.screenHorizontal,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIcon: {
    alignItems: 'center',
    marginTop: Grid.rowGap,
  },
  heroDot: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    marginTop: Grid.rowGap,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialCodeField: {
    width: 72,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: Grid.gutterWidth,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Grid.gutterWidth,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: colors.text,
    marginBottom: Spacing.sm,
    backgroundColor: colors.surface,
  },
  countryItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
});


