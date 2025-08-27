import axios from "axios";
import React, { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, LockIcon, UserIcon } from '../../design-system/icons';
import { TextField } from '../../design-system/inputs';
import { Margin } from '../../design-system/Layout/margins';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';
import { router, useLocalSearchParams } from 'expo-router';


const CompleteRegisteration = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email, phone_number } = useLocalSearchParams();

  const handleCompleteRegisteration = async () => {
    try {
      const requestData = {
        email: email, // This should come from previous screen
        phone_number: phone_number, // This should come from previous screen
        password,
        confirm_password: confirmPassword,
       
        user_type: 'CUSTOMER', // Default to customer
      };
      
      console.log('Sending complete registration request:', requestData);
      console.log('API URL:', axios.post(`${BASE_URL}auth/complete-registeration/`, requestData));
      
      const response = await axios.post(`${BASE_URL}auth/complete-registeration/`, requestData);
      
      console.log('Registration completed successfully:', response.data);
      router.push({
        pathname: '/(auth)/ProfilePhoto' as never,
        params: { email: email, phone_number: phone_number }
      });
     
      
    } catch (error: any) {
      console.error('Registration completion failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      const errorMessage = error.response?.data?.message || error.message || 'Registration completion failed. Please try again.';
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  const isDisabled = !password || !confirmPassword || password !== confirmPassword;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header (fixed) */}
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
          onPress={() => {}}
        >
          <BackArrow width={24} height={24} color={colors.text} />
        </TouchableOpacity>

        {/* User Icon */}
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
            <UserIcon width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            Create Password
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText}>
            Choose a strong password for your account
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
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a strong password"
            secureTextEntry={true}
          />
        </View>

        <View style={{ ...Margin.betweenComponents }}>
          <TextField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry={true}
          />
        </View>

        {/* Password Requirements */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginTop: Spacing.xs 
        }}>
          <LockIcon width={16} height={16} color={colors.secondaryText} />
          <Typography 
            variant="caption" 
            color={colors.secondaryText}
            style={{ marginLeft: 4 }}
          >
            Password must be at least 8 characters long
          </Typography>
        </View>
      </ScrollView>

      {/* Footer (fixed) */}
      <View style={{ ...Padding.screenHorizontal, paddingBottom: Spacing.lg }}>
        <AppButton
          variant={isDisabled ? 'primaryDisabled' : 'primaryLarge'}
          title="Complete Registration"
          onPress={handleCompleteRegisteration}
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

export default CompleteRegisteration;

