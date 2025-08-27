import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, HomeIcon, LockIcon, screwdriver as Screwdriver, UserIcon } from '../../design-system/icons';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const test = () => {
  const resetpassword = () => {
    // Will redirect to resetpassword screen
    router.push('/(auth)/resetpassword');
  };

  const register = () => {
    // Will redirect to register screen
    router.push('/(auth)/register');
  };

  const handleBack = () => {
    router.back();
  };

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

        {/* Screwdriver Icon */}
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
            <HomeIcon width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            choose your option
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText}>
            Where should we start?
          </Typography>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1, ...Padding.screenHorizontal }}>
        {/* Email Option */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: Spacing.md,
            marginBottom: Spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={resetpassword}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: colors.background,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}
            >
              <Screwdriver width={24} height={24} color={colors.text} />
            </View>
            <Typography variant="body">Reset Password</Typography>
          </View>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: colors.background,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BackArrow 
              width={16} 
              height={16} 
              color={colors.text} 
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </View>
        </TouchableOpacity>

        {/* WhatsApp Option */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: Spacing.md,
            marginBottom: Spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={register}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: colors.background,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}
            >
              <UserIcon width={24} height={24} color={colors.text} />
            </View>
            <Typography variant="body">Register</Typography>
          </View>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: colors.background,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BackArrow 
              width={16} 
              height={16} 
              color={colors.text} 
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={{ 
        ...Padding.screenHorizontal, 
        paddingBottom: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
  );
};

export default test;
