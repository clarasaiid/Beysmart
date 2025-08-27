import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, EmailIcon, LockIcon, screwdriver as Screwdriver, WhatsappIcon } from '../../design-system/icons';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const ResetPassword = () => {
  const handleEmailReset = () => {
    // Will redirect to resetbyemail screen (to be created later)
    router.push('/(auth)/resetbyemail' as never);
  };

  const handlePhoneReset = () => {
    // Will redirect to resetbyphone screen (to be created later)
    router.push('/(auth)/resetbyphone' as never);
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
            <Screwdriver width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            Reset Password
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText}>
            Where should we send your code?
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
          onPress={handleEmailReset}
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
              <EmailIcon width={24} height={24} color={colors.text} />
            </View>
            <Typography variant="body">Email</Typography>
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
          onPress={handlePhoneReset}
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
              <WhatsappIcon width={24} height={24} color={colors.text} />
            </View>
            <Typography variant="body">WhatsApp</Typography>
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

export default ResetPassword;
