import { router } from 'expo-router';
import React from 'react';
import { Image, Modal, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { colors } from '../../design-system/colors/colors';
import {
  HelpSupport,
  HomeIcon,
  Invite,
  PlusIcon,
  SettingsIcon
} from '../../design-system/icons/filled';
import { Spacing } from '../../design-system/Layout/spacing';
import { ProfileConstants } from '../../design-system/Profile actions/Constants';
import { Typography } from '../../design-system/typography/typography';

interface UserData {
  name?: string | null;
  email: string;
  profilePicture?: string | null;
  homesCount: number;
}

interface ProfilePageProps {
  userData?: UserData;
  visible?: boolean;
  onClose?: () => void;
  onAddDevice?: () => void;
  onMyHomes?: () => void;
  onInviteFamily?: () => void;
  onAccountSettings?: () => void;
  onHelpSupport?: () => void;
}

export default function ProfilePage({
  userData,
  visible = true,
  onClose,
  onAddDevice,
  onMyHomes,
  onInviteFamily,
  onAccountSettings,
  onHelpSupport,
}: ProfilePageProps) {
  // Default values when userData is not provided
  const defaultUserData = {
    name: null,
    email: 'Loading...',
    profilePicture: null,
    homesCount: 0,
  };

  const { name, email, profilePicture, homesCount } = userData || defaultUserData;

  // Dynamic user display logic
  const displayName = name || email;
  const displayEmail = name ? email : null;
  const isNameBold = !!name;

  const handleAddDevice = () => {
    onAddDevice?.();
  };

  const handleMyHomes = () => {
    router.push('/(profile actions)/myHomes');
    onMyHomes?.();
  };

  const handleInviteFamily = () => {
    onInviteFamily?.();
  };

  const handleAccountSettings = () => {
    router.push('/(profile actions)/AccountSettings');
    onAccountSettings?.();
  };

  const handleHelpSupport = () => {
    router.push('/(profile actions)/Help&support');
    onHelpSupport?.();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Pressable 
        style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}
        onPress={onClose}
      >
        <Pressable 
          style={{ 
            width: 316, // Fixed width from Figma
            height: '100%', // Full height
            backgroundColor: colors.surface,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={(e) => e.stopPropagation()}
        >
        <ScrollView 
          style={{ flex: 1 }} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ 
            flex: 1, 
            paddingHorizontal: Spacing.lg, 
            paddingTop: Spacing.xxl + Spacing.lg, // Increased top padding to lower content
            paddingBottom: Spacing.xxl 
          }}>
            {/* User Profile Header */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: Spacing.lg 
            }}>
              <View style={{ marginRight: Spacing.sm }}>
                {profilePicture ? (
                  <Image 
                    source={{ uri: profilePicture }} 
                    style={{ 
                      width: 50, 
                      height: 50, 
                      borderRadius: 25 
                    }} 
                  />
                ) : (
                  <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: colors.primary.base,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography variant="h3" color={colors.surface}>
                      {displayName.charAt(0).toUpperCase()}
                    </Typography>
                  </View>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Typography 
                  variant={isNameBold ? "body" : "accent"} 
                  color={colors.text}
                  style={{ marginBottom: Spacing.xs }}
                >
                  {displayName}
                </Typography>
                {displayEmail && (
                  <Typography 
                    variant="caption" 
                    color={colors.secondaryText}
                    style={{ fontSize: 12 }}
                  >
                    {displayEmail}
                  </Typography>
                )}
              </View>
            </View>

            {/* Add New Device Button */}
            <View style={{ marginBottom: Spacing.lg }}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary.base,
                  borderRadius: 12,
                  paddingVertical: Spacing.sm,
                  paddingHorizontal: Spacing.lg,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleAddDevice}
                accessibilityLabel={ProfileConstants.addDeviceAccessibilityLabel}
                accessibilityHint={ProfileConstants.addDeviceAccessibilityHint}
              >
                <PlusIcon width={16} height={16} color={colors.text} />
                <Typography
                  variant="accent"
                  color={colors.text}
                  style={{ 
                    fontWeight: 'bold',
                    marginLeft: Spacing.xs
                  }}
                >
                  {ProfileConstants.addNewDevice}
                </Typography>
              </TouchableOpacity>
            </View>

            {/* Navigation Menu Items */}
            <View style={{ marginBottom: Spacing.md }}>
              {/* My Homes */}
              <TouchableOpacity 
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: Spacing.sm,
                  paddingHorizontal: Spacing.xs,
                  borderRadius: 6,
                }}
                onPress={handleMyHomes}
                accessibilityLabel={ProfileConstants.myHomesAccessibilityLabel}
                accessibilityHint={ProfileConstants.myHomesAccessibilityHint}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  flex: 1 
                }}>
                  <View style={{
                    marginRight: Spacing.sm,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <HomeIcon width={20} height={20} color={colors.text} />
                  </View>
                  <Typography variant="caption" color={colors.text} style={{ flex: 1 }}>
                    {ProfileConstants.myHomes}
                  </Typography>
                </View>
                <View style={{ marginLeft: Spacing.xs }}>
                  <View style={{
                    backgroundColor: colors.primary.base,
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: Spacing.xs,
                  }}>
                    <Typography variant="caption" color={colors.text} style={{ fontWeight: 'bold', fontSize: 12 }}>
                      {homesCount}
                    </Typography>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Invite Family & Friends */}
              <TouchableOpacity 
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: Spacing.sm,
                  paddingHorizontal: Spacing.xs,
                  borderRadius: 6,
                }}
                onPress={handleInviteFamily}
                accessibilityLabel={ProfileConstants.inviteAccessibilityLabel}
                accessibilityHint={ProfileConstants.inviteAccessibilityHint}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  flex: 1 
                }}>
                  <View style={{
                    marginRight: Spacing.sm,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Invite width={20} height={20} color={colors.text} />
                  </View>
                  <Typography variant="caption" color={colors.text} style={{ flex: 1 }}>
                    {ProfileConstants.inviteFamilyFriends}
                  </Typography>
                </View>
              </TouchableOpacity>
            </View>

            {/* Settings Section */}
            <View>
              <View style={{
                height: 1,
                backgroundColor: colors.border,
                marginVertical: Spacing.sm,
              }} />
              
              {/* Account Settings */}
              <TouchableOpacity 
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: Spacing.sm,
                  paddingHorizontal: Spacing.xs,
                  borderRadius: 6,
                }}
                onPress={handleAccountSettings}
                accessibilityLabel={ProfileConstants.accountSettingsAccessibilityLabel}
                accessibilityHint={ProfileConstants.accountSettingsAccessibilityHint}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  flex: 1 
                }}>
                  <View style={{
                    marginRight: Spacing.sm,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <SettingsIcon width={20} height={20} color={colors.text} />
                  </View>
                  <Typography variant="caption" color={colors.text} style={{ flex: 1 }}>
                    {ProfileConstants.accountSettings}
                  </Typography>
                </View>
              </TouchableOpacity>

              {/* Help & Support */}
              <TouchableOpacity 
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: Spacing.sm,
                  paddingHorizontal: Spacing.xs,
                  borderRadius: 6,
                }}
                onPress={handleHelpSupport}
                accessibilityLabel={ProfileConstants.helpSupportAccessibilityLabel}
                accessibilityHint={ProfileConstants.helpSupportAccessibilityHint}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  flex: 1 
                }}>
                  <View style={{
                    marginRight: Spacing.sm,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <HelpSupport width={20} height={20} color={colors.text} />
                  </View>
                  <Typography variant="caption" color={colors.text} style={{ flex: 1 }}>
                    {ProfileConstants.helpSupport}
                  </Typography>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

