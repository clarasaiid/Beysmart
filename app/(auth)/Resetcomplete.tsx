import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import Correct from '../../design-system/icons/outlined/correct';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const ResetComplete = () => {
  const handleGoToLogin = () => {
    router.replace('/(app)/home' as never);
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.secondaryText,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.lg,
    }}>
      {/* Success Icon */}
      <View style={{
        marginBottom: Spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Correct 
          width={80}
          height={80}
          color={colors.primary.base}
        />
      </View>

      {/* Title */}
      <Typography 
        variant="h1" 
        color={colors.surface}
        style={{
          textAlign: 'center',
          marginBottom: Spacing.md,
        }}
      >
        Password Reset Complete
      </Typography>

      {/* Description */}
      <Typography 
        variant="body" 
        color="#9CA3AF"
        style={{
          textAlign: 'center',
          marginBottom: Spacing.xxl,
          paddingHorizontal: Spacing.lg,
        }}
      >
        Your password has been successfully updated
      </Typography>

      {/* Button */}
      <View style={{
        width: '100%',
        maxWidth: 300,
      }}>
        <AppButton
          variant="primaryLarge"
          title="Go to Login"
          onPress={handleGoToLogin}
        />
      </View>
    </View>
  );
};



export default ResetComplete;
