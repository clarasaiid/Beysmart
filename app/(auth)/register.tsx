import axios from "axios";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/api';

// Design System imports
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, DropdownIcon, LockIcon, UserIcon } from '../../design-system/icons';
import TextField from '../../design-system/inputs/TextField';
import { Margin } from '../../design-system/Layout/margins';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const countries = [
    { name: 'Egypt', dial: '+20' },
    { name: 'United States', dial: '+1' },
    { name: 'United Kingdom', dial: '+44' },
    { name: 'Saudi Arabia', dial: '+966' },
    { name: 'United Arab Emirates', dial: '+971' },
    { name: 'France', dial: '+33' },
    { name: 'Germany', dial: '+49' },
    { name: 'India', dial: '+91' },
    { name: 'Canada', dial: '+1' },
    { name: 'Brazil', dial: '+55' },
  ];
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    try {
      const requestData = {
        email,
        phone_number: phoneNumber,
        country: selectedCountry.name,
      };
      
      console.log('Sending registration request:', requestData);
      console.log('API URL:', `${BASE_URL}auth/register/`);
      
      const response = await axios.post(`${BASE_URL}auth/register/`, requestData);
      
      console.log('Registration successful:', response.data);
      // Navigate to OTP verification screen with user data
      router.push({
        pathname: '/(auth)/verify-otp', 
        params: {email: email, phone_number: phoneNumber, flow: 'register'}
      });
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  const isDisabled = !email || !phoneNumber;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header (fixed) */}
      <View style={{ paddingTop: Spacing.xs, ...Padding.screenHorizontal }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            width: 48, // icon container 48px (6x base unit)
            height: 48,
            backgroundColor: colors.surface,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.lg,
          }}
          onPress={() => {}}
        >
          <BackArrow width={24} height={24} color={colors.text} />
        </TouchableOpacity>

        {/* User Icon */}
        <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
          <View
            style={{
              width: 96, // 12x base unit
              height: 96,
              backgroundColor: colors.primary.base,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.md,
            }}
          >
            <UserIcon width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            Welcome To Beysmart
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText}>
            Create Your Account
          </Typography>
        </View>
      </View>

      {/* Form (scrollable) */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          ...Padding.screenHorizontal,
          paddingBottom: Spacing.xl,
        }}
      >
        {/* Form Fields */}
        <View style={{ ...Margin.betweenComponents }}>
          <TextField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
          />
        </View>

        <View style={{ ...Margin.betweenComponents }}>
          <View style={{ marginBottom: Spacing.xs }}>
            <Typography variant="body" style={{ marginBottom: Spacing.xs }}>
              Country/Region
            </Typography>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              paddingHorizontal: Spacing.sm, // 16px input horizontal padding
              paddingVertical: 12, // matches TextField content height guidance
              backgroundColor: colors.surface,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => setCountryPickerVisible(true)}
          >
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              {selectedCountry.name}
            </Typography>
            <DropdownIcon width={16} height={16} color={colors.secondaryText} />
          </TouchableOpacity>
        </View>

        <View style={{ ...Margin.betweenComponents }}>
          <TextField
            label="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="(123) 456-7890"
            leftIcon={
              <View style={{ 
                paddingRight: 8, 
                borderRightWidth: 1, 
                borderRightColor: colors.border,
                marginRight: 8
              }}>
                <Typography variant="body" style={{ fontWeight: 'bold' }}>
                  {selectedCountry.dial}
                </Typography>
              </View>
            }
          />
          
          {/* WhatsApp Info */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginTop: Spacing.xs 
          }}>
            {/* TODO: replace with a WhatsApp icon from the design system if added */}
            <UserIcon width={16} height={16} color={colors.secondaryText} />
            <Typography 
              variant="caption" 
              color={colors.secondaryText}
              style={{ marginLeft: 4 }}
            >
              Make sure the number you enter has active WhatsApp.
            </Typography>
          </View>
        </View>
      </ScrollView>

      {/* Country Picker Modal */}
      <Modal
        visible={countryPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCountryPickerVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: colors.surface, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '70%', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.md }}>
            <View style={{ alignItems: 'flex-end', marginBottom: Spacing.xs }}>
              <TouchableOpacity onPress={() => setCountryPickerVisible(false)}>
                <Typography variant="accent" color={colors.secondaryText}>Close</Typography>
              </TouchableOpacity>
            </View>
            <Typography variant="h3" style={{ marginBottom: Spacing.sm }}>Select Country/Region</Typography>
            <ScrollView>
              {countries.map((c) => (
                <TouchableOpacity
                  key={c.name}
                  onPress={() => { setSelectedCountry(c); setCountryPickerVisible(false); }}
                  style={{ paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}
                >
                  <Typography variant="body">{c.name}</Typography>
                  <Typography variant="body" color={colors.secondaryText}>{c.dial}</Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Footer (fixed) */}
      <View style={{ ...Padding.screenHorizontal, paddingBottom: Spacing.lg }}>
        <AppButton
          variant={isDisabled ? 'primaryDisabled' : 'primaryLarge'}
          title="Next"
          onPress={handleRegister}
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
    </View>
  );
};


export default Register;


