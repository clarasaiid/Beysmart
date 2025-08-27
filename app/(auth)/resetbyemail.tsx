import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, checkemail as Checkemail, LockIcon } from '../../design-system/icons';
import { TextField } from '../../design-system/inputs';
import { Margin } from '../../design-system/Layout/margins';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const ResetByEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
        const requestData = {
            email,
          };
          
          console.log('Requesting new Password:', requestData);
          console.log('API URL:', `${BASE_URL}auth/request-reset-password/`);
          
          const response = await axios.post(`${BASE_URL}auth/request-reset-password/`, requestData);
          
          console.log('Request has been sent:', response.data);
          // Navigate to OTP verification screen with user data
          router.push({
            pathname: '/(auth)/verify-otp', 
            params: {email: email, flow: 'reset-password'}
          });
  
      
      // For now, just show success
      Alert.alert('Success', 'Verification code sent to your email');
      
    } catch (error: any) {
      console.error('Failed to send reset code:', error);
      setError(error.response?.data?.message || 'Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !email.trim() || isLoading;

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

        {/* Email Icon */}
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
            <Checkemail width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            Enter your email
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText}>
            We'll send you a verification code (please make sure your email is verified to receive the code)
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
        {/* Email Input Field */}
        <View style={{ ...Margin.betweenComponents }}>
          <Typography variant="body" color={colors.text} style={{ marginBottom: Spacing.xs }}>
            Email Address
          </Typography>
          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
          />
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
    </View>
  );
};

export default ResetByEmail;









