import { Padding } from '@/design-system/Layout/padding';
import axios from "axios";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { BackArrow } from '../../design-system/icons';
import Arrow from '../../design-system/icons/outlined/arrow';
import LockIcon from '../../design-system/icons/outlined/Lock';
import Message from '../../design-system/icons/outlined/message';
import { OTPInputField } from '../../design-system/inputs';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const VerifyOTPScreen = () => {
  const { email, phone_number, flow } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  
  const handleVerifyOTP = async () => {
    try {
      const requestData = {
        otp: otp.join(''),
        email: email || undefined,
        phone_number: phone_number || undefined,
      };
  
      console.log('Sending verify OTP request:', requestData);
      console.log('API URL:', `${BASE_URL}auth/verify-otp/`);
  
      const response = await axios.post(`${BASE_URL}auth/verify-otp/`, requestData);
      if(flow === 'register'){
        router.push({
          pathname: '/(auth)/Complete-Registeration',
          params: { email: email, phone_number: phone_number }
        });
      }
      else if(flow === 'reset-password'){
        router.push({
          pathname: '/(auth)/newpassword',
          params: { email: email, phone_number: phone_number }
        });
      }
  
      console.log('OTP verification successful:', response.data);
  
      // ✅ Just check success by message (backend never sends OTP back)
      Alert.alert('Success', response.data.message);
      
  
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      const errorMessage = error.response?.data?.error || error.message || 'OTP verification failed. Please try again.';
      Alert.alert('OTP Verification Failed', errorMessage);
    }
  };
  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    if (canResend) {
      setTimer(59);
      setCanResend(false);
      // Add your resend logic here
      Alert.alert('Code Resent', 'A new verification code has been sent to your WhatsApp.');
    }
  };



  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
    {/* Header (fixed) */}
    <View style={{ paddingTop: Spacing.md, ...Padding.screenHorizontal }}>
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
      </View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: Spacing.md,
          paddingTop: Spacing.xl,
          paddingBottom: Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon Circle */}
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
            <Message width={32} height={32} color={colors.text} />
          </View>
          </View>
          

        {/* Title */}
        <Typography variant="h3" style={{
          textAlign: 'center',
          marginBottom: Spacing.sm,
          color: colors.text,
        }}>
          Verify Your Phone Number
        </Typography>

        {/* Subtitle */}
        <Typography variant="body" style={{
          textAlign: 'center',
          marginBottom: Spacing.xl,
          color: colors.secondaryText,
          paddingHorizontal: Spacing.md,
        }}>
          We've sent a code on WhatsApp to Your Phone Number
        </Typography>

        {/* OTP Input Fields */}
        <View style={{
          width: '100%',
          marginBottom: Spacing.lg,
          paddingHorizontal: Spacing.md,
        }}>
          <OTPInputField
            length={4}
            value={otp}
            onChange={setOtp}
            autoFocus={true}
            onComplete={(value: string) => {
              // OTP is complete, you can handle this here
              console.log('OTP Complete:', value);
            }}
          />
        </View>

        {/* Resend Timer */}
        <TouchableOpacity 
          style={{
            marginBottom: Spacing.lg,
          }} 
          onPress={handleResendCode}
          disabled={!canResend}
        >
          <Typography variant="body" style={{
            color: colors.secondaryText,
          }}>
            Resend code in{' '}
            <Typography variant="body" style={{
              fontWeight: '700',
              color: colors.text,
            }}>
              {timer}s
            </Typography>
          </Typography>
        </TouchableOpacity>

        {/* Continue Button */}
        <AppButton
          variant="primaryLarge"
          title="Continue"
          icon={<Arrow width={15} height={15} color={colors.text} />}
          onPress={handleVerifyOTP}
          disabled={!isOtpComplete}
        />

        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginTop: Spacing.xl 
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
      </ScrollView>
    </View>
  );
};

export default VerifyOTPScreen;
