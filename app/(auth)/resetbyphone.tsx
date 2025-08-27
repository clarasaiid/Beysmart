import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, DropdownIcon, LockIcon, Phone } from '../../design-system/icons';
import { TextField } from '../../design-system/inputs';
import { Margin } from '../../design-system/Layout/margins';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

// Country data with country codes
const countries = [
  { name: 'Egypt', code: '+20' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Italy', code: '+39' },
  { name: 'Spain', code: '+34' },
  { name: 'Canada', code: '+1' },
  { name: 'Australia', code: '+61' },
  { name: 'India', code: '+91' },
  { name: 'China', code: '+86' },
  { name: 'Japan', code: '+81' },
  { name: 'Brazil', code: '+55' },
  { name: 'Mexico', code: '+52' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'UAE', code: '+971' },
  { name: 'Turkey', code: '+90' },
  { name: 'South Africa', code: '+27' },
  { name: 'Nigeria', code: '+234' },
  { name: 'Kenya', code: '+254' },
];

const ResetByPhone = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to Egypt
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Combine country code with phone number
      const fullPhoneNumber = `${selectedCountry.code}${phoneNumber.replace(/\D/g, '')}`;
      
      const requestData = {
        phone_number: fullPhoneNumber,
      };
      
      console.log('Requesting new Password:', requestData);
      console.log('API URL:', `${BASE_URL}auth/request-reset-password/`);
      
      const response = await axios.post(`${BASE_URL}auth/request-reset-password/`, requestData);
      
      console.log('Request has been sent:', response.data);
      // Navigate to OTP verification screen with user data
      router.push({
        pathname: '/(auth)/verify-otp', 
        params: { phone_number: fullPhoneNumber, country: selectedCountry.name, flow: 'reset-password' }
      });
      
    } catch (error: any) {
      console.error('Failed to send reset code:', error);
      setError(error.response?.data?.error || 'Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectCountry = (country: any) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const isDisabled = !phoneNumber.trim() || isLoading;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ paddingTop: Spacing.md, ...Padding.screenHorizontal }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            width: 48,
            height: 48,
            backgroundColor: colors.surface,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.lg,
          }}
          onPress={handleBack}
        >
          <BackArrow width={24} height={24} color={colors.text} />
        </TouchableOpacity>

        {/* Phone Icon */}
        <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: colors.primary.base,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.md,
            }}
          >
            <Phone width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            Enter your phone
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText}>
            We'll send you a verification code
          </Typography>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          ...Padding.screenHorizontal,
          paddingBottom: Spacing.xl,
        }}
      >
        {/* Country/Region Dropdown */}
        <View style={{ ...Margin.betweenComponents }}>
          <Typography variant="body" color={colors.text} style={{ marginBottom: Spacing.xs }}>
            Country/Region
          </Typography>
          <TouchableOpacity
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: Spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: colors.border,
            }}
            onPress={() => setShowCountryPicker(true)}
          >
            <Typography variant="body" color={colors.text}>
              {selectedCountry.name}
            </Typography>
            <DropdownIcon width={20} height={20} color={colors.secondaryText} />
          </TouchableOpacity>
        </View>

        {/* Phone Number Input */}
        <View style={{ ...Margin.betweenComponents }}>
          <Typography variant="body" color={colors.text} style={{ marginBottom: Spacing.xs }}>
            Phone number
          </Typography>
          <View style={{ flexDirection: 'row', gap: Spacing.xs }}>
            {/* Country Code */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: Spacing.md,
                borderWidth: 1,
                borderColor: colors.border,
                minWidth: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body" color={colors.text}>
                {selectedCountry.code}
              </Typography>
            </View>
            
            {/* Phone Number Field */}
            <View style={{ flex: 1 }}>
              <TextField
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="(123) 456-7890"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          {error ? (
            <Typography variant="caption" color={colors.error} style={{ marginTop: Spacing.xs }}>
              {error}
            </Typography>
          ) : null}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{ ...Padding.screenHorizontal, paddingBottom: Spacing.lg }}>
        <AppButton
          variant={isDisabled ? 'primaryDisabled' : 'primaryLarge'}
          title="Send code"
          onPress={handleSendCode}
          disabled={isDisabled}
        />

        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginTop: Spacing.lg 
        }}>
          <LockIcon width={16} height={16} color={colors.secondaryText} />
          <Typography 
            variant="caption" 
            color={colors.secondaryText}
            style={{ marginLeft: 4 }}
          >
            Your data is securely encrypted
          </Typography>
        </View>
      </View>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end'
        }}>
          <View style={{ 
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: Spacing.lg,
            maxHeight: '70%'
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: Spacing.lg
            }}>
              <Typography variant="h2">Select Country</Typography>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Typography variant="body" color={colors.primary.base}>Cancel</Typography>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: Spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onPress={() => selectCountry(item)}
                >
                  <Typography variant="body">{item.name}</Typography>
                  <Typography variant="body" color={colors.secondaryText}>{item.code}</Typography>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetByPhone;


