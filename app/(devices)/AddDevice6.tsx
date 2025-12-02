import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import ProfilePage from '../(profile actions)/Profile';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { WIFI_DETAILS } from '../../design-system/home/Constants';
import { BackArrow } from '../../design-system/icons';
import TextField from '../../design-system/inputs/TextField';
import { Spacing } from '../../design-system/Layout/spacing';
import { BottomNavigation } from '../../design-system/Navigation/BottomNavigation';
import { Typography } from '../../design-system/typography/typography';
// Metro config handles BLE mocking when DISABLE_BLE=true
import bluetoothManager from '../../src/ble';

const AddDevice6 = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [errors, setErrors] = useState<{ wifiName?: string; wifiPassword?: string }>({});
  const [isSendingWiFi, setIsSendingWiFi] = useState(false);

  // TODO: Replace these UUIDs with your actual device's service and characteristic UUIDs
  // You need to get these from your ESP32/hardware developer
  const WIFI_SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"; // Example UUID
  const WIFI_CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"; // Example UUID

  // Load user data for profile
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser({
            first_name: userData.first_name || undefined,
            profile_picture: userData.profile_picture ? `${BASE_URL.replace('/api/', '')}${userData.profile_picture}` : undefined
          });
          setUserEmail(userData.email || '');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleBack = () => router.back();

  const validateForm = () => {
    const newErrors: { wifiName?: string; wifiPassword?: string } = {};

    if (!wifiName.trim()) {
      newErrors.wifiName = WIFI_DETAILS.VALIDATION.WIFI_NAME_REQUIRED;
    } else if (wifiName.trim().length < 2) {
      newErrors.wifiName = WIFI_DETAILS.VALIDATION.WIFI_NAME_MIN_LENGTH;
    }

    if (!wifiPassword.trim()) {
      newErrors.wifiPassword = WIFI_DETAILS.VALIDATION.WIFI_PASSWORD_REQUIRED;
    } else if (wifiPassword.trim().length < 8) {
      newErrors.wifiPassword = WIFI_DETAILS.VALIDATION.WIFI_PASSWORD_MIN_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    setIsSendingWiFi(true);

    try {
      // Get the connected device
      const connectedDevice = bluetoothManager.getConnectedDevice();
      
      if (!connectedDevice) {
        Alert.alert(
          'Not Connected',
          'No device is connected. Please go back and connect to your device first.',
          [{ text: 'OK' }]
        );
        setIsSendingWiFi(false);
        return;
      }

      console.log('📡 Sending WiFi credentials to device:', connectedDevice.name);

      // First, retrieve services to ensure device is ready
      await bluetoothManager.retrieveServices(connectedDevice.id);

      // Send WiFi credentials via Bluetooth
      const success = await bluetoothManager.sendWiFiCredentials(
        connectedDevice.id,
        wifiName,
        wifiPassword,
        WIFI_SERVICE_UUID,
        WIFI_CHARACTERISTIC_UUID
      );

      if (success) {
        // Store WiFi credentials in case we need them later
        await AsyncStorage.setItem('lastWifiSSID', wifiName);
        console.log('✅ WiFi credentials sent successfully');
        
        // Wait a bit for device to process
        setTimeout(() => {
          setIsSendingWiFi(false);
          router.push('/(devices)/AddDevice7');
        }, 1000);
      } else {
        throw new Error('Failed to send WiFi credentials');
      }
    } catch (error: any) {
      console.error('❌ Error sending WiFi credentials:', error);
      setIsSendingWiFi(false);
      
      Alert.alert(
        'Connection Error',
        'Failed to send WiFi credentials to the device. Make sure the device is still connected.\n\nNote: You may need to update the Service and Characteristic UUIDs in the code to match your hardware.',
        [
          { text: 'Try Again', onPress: () => handleContinue() },
          { text: 'Skip for Now', onPress: () => router.push('/(devices)/AddDevice7') }
        ]
      );
    }
  };

  const handleTabPress = (key: string) => {
    switch (key) {
      case 'home':
        router.push('/(app)/home');
        break;
      case 'devices':
        router.push('/(tabs)/explore');
        break;
      case 'energy':
        router.push('/(tabs)/explore');
        break;
      case 'profile':
        setShowProfile(true);
        break;
    }
  };

  const bottomNavItems = [
    { key: 'home', label: 'Home', icon: null },
    { key: 'devices', label: 'Devices', icon: null },
    { key: 'energy', label: 'Energy', icon: null },
    { key: 'profile', label: 'Profile', icon: null },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrow width={24} height={24} color={colors.surface} />
          </TouchableOpacity>
          <Typography variant="h3" color={colors.surface} style={styles.headerTitle}>
            {WIFI_DETAILS.NAVIGATION.TITLE}
          </Typography>
        </View>
        <Typography variant="caption" color={colors.surface} style={styles.stepIndicator}>
          {WIFI_DETAILS.NAVIGATION.STEP_INDICATOR}
        </Typography>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Typography variant="h2" color={colors.text} style={styles.sectionTitle}>
          {WIFI_DETAILS.SECTIONS.WIFI_DETAILS}
        </Typography>

        {/* WiFi Name Field */}
        <TextField
          label={WIFI_DETAILS.FIELDS.WIFI_NAME.LABEL}
          value={wifiName}
          onChangeText={setWifiName}
          placeholder={WIFI_DETAILS.FIELDS.WIFI_NAME.PLACEHOLDER}
          error={errors.wifiName}
          accessibilityLabel={WIFI_DETAILS.FIELDS.WIFI_NAME.LABEL}
          accessibilityHint={`Enter your ${WIFI_DETAILS.FIELDS.WIFI_NAME.LABEL.toLowerCase()}`}
        />

        {/* WiFi Password Field */}
        <TextField
          label={WIFI_DETAILS.FIELDS.WIFI_PASSWORD.LABEL}
          value={wifiPassword}
          onChangeText={setWifiPassword}
          placeholder={WIFI_DETAILS.FIELDS.WIFI_PASSWORD.PLACEHOLDER}
          secureTextEntry={true}
          showEyeIcon={true}
          error={errors.wifiPassword}
          accessibilityLabel={WIFI_DETAILS.FIELDS.WIFI_PASSWORD.LABEL}
          accessibilityHint={`Enter your ${WIFI_DETAILS.FIELDS.WIFI_PASSWORD.LABEL.toLowerCase()}`}
        />

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <AppButton
            variant="primaryLarge"
            title={isSendingWiFi ? 'Sending WiFi Credentials...' : WIFI_DETAILS.NAVIGATION.CONTINUE_BUTTON}
            onPress={handleContinue}
            disabled={isSendingWiFi}
            accessibilityLabel={WIFI_DETAILS.NAVIGATION.CONTINUE_BUTTON}
            accessibilityHint="Tap to continue with WiFi setup"
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={bottomNavItems}
        activeKey="devices"
        onTabPress={handleTabPress}
      />

      {/* Profile Modal */}
      <ProfilePage
        visible={showProfile}
        userData={user ? {
          name: user.first_name || null,
          email: userEmail,
          profilePicture: user.profile_picture || null,
          homesCount: 0 // We don't have homes data in this context
        } : undefined}
        onClose={() => setShowProfile(false)}
        onAddDevice={() => {
          setShowProfile(false);
          router.push('/(devices)/AddDevice2');
        }}
        onMyHomes={() => {
          setShowProfile(false);
          router.push('/(profile actions)/myHomes');
        }}
        onInviteFamily={() => {
          setShowProfile(false);
          // Handle invite family
        }}
        onAccountSettings={() => {
          setShowProfile(false);
          router.push('/(profile actions)/AccountSettings');
        }}
        onHelpSupport={() => {
          setShowProfile(false);
          router.push('/(profile actions)/Help&support');
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.navBarBackground,
  },
  header: {
    backgroundColor: colors.navBarBackground,
    height: 120,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xxl,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  backButton: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  headerTitle: {
    textAlign: 'left' as const,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  stepIndicator: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: Spacing.sm - 2,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center' as const,
  },
};

export default AddDevice6;
