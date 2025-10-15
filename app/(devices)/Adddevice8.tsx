import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ProfilePage from '../(profile actions)/Profile';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { DEVICE_DETAILS_SETUP } from '../../design-system/home/Constants';
import { BackArrow } from '../../design-system/icons';
import Dropdown, { DropdownOption } from '../../design-system/inputs/Dropdown';
import TextField from '../../design-system/inputs/TextField';
import { Spacing } from '../../design-system/Layout/spacing';
import { BottomNavigation } from '../../design-system/Navigation/BottomNavigation';
import { Typography } from '../../design-system/typography/typography';
import apiClient from '../../utils/api';

interface Home {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  home: string; // This matches the backend model structure
}

const AddDevice8 = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [deviceName, setDeviceName] = useState('');
  const [selectedHome, setSelectedHome] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [homes, setHomes] = useState<Home[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [errors, setErrors] = useState<{ deviceName?: string; home?: string; room?: string }>({});

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

  // Load homes data
  useEffect(() => {
    const loadHomes = async () => {
      try {
        console.log('Loading homes from API...');
        const response = await apiClient.get('home/homes/');
        console.log('Homes response:', response.data);
        setHomes(response.data);
      } catch (error: any) {
        console.error('Error loading homes:', error);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        // Fallback to empty array if API fails
        setHomes([]);
      }
    };
    loadHomes();
  }, []);

  // Load rooms data
  useEffect(() => {
    const loadRooms = async () => {
      try {
        console.log('Loading rooms from API...');
        const response = await apiClient.get('home/rooms/');
        console.log('Rooms response:', response.data);
        setRooms(response.data);
      } catch (error: any) {
        console.error('Error loading rooms:', error);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        // Fallback to empty array if API fails
        setRooms([]);
      }
    };
    loadRooms();
  }, []);

  const handleBack = () => router.back();

  const validateForm = () => {
    const newErrors: { deviceName?: string; home?: string; room?: string } = {};

    if (!deviceName.trim()) {
      newErrors.deviceName = DEVICE_DETAILS_SETUP.VALIDATION.DEVICE_NAME_REQUIRED;
    } else if (deviceName.trim().length < 2) {
      newErrors.deviceName = DEVICE_DETAILS_SETUP.VALIDATION.DEVICE_NAME_MIN_LENGTH;
    }

    if (!selectedHome) {
      newErrors.home = DEVICE_DETAILS_SETUP.VALIDATION.HOME_REQUIRED;
    }

    if (!selectedRoom) {
      newErrors.room = DEVICE_DETAILS_SETUP.VALIDATION.ROOM_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // TODO: Implement device creation logic
      console.log('Device Details:', { deviceName, selectedHome, selectedRoom });
      
      // Find the selected home name
      const selectedHomeName = homes.find(home => home.id === selectedHome)?.name || selectedHome;
      
      // Navigate to device calibration screen with device details
      router.push({
        pathname: '/(devices)/AddDevice9',
        params: {
          deviceName: deviceName,
          deviceLocation: selectedHomeName,
          deviceType: 'beylock', // For now, default to lock. This should come from device selection
        }
      });
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

  // Convert homes to dropdown options
  const homeOptions: DropdownOption[] = homes.map(home => ({
    label: home.name,
    value: home.id,
  }));

  // Filter rooms based on selected home
  const filteredRooms = selectedHome 
    ? rooms.filter(room => room.home === selectedHome)
    : rooms;

  // Convert rooms to dropdown options
  const roomOptions: DropdownOption[] = filteredRooms.map(room => ({
    label: room.name,
    value: room.id,
  }));

  // Reset room selection when home changes
  const handleHomeChange = (value: string) => {
    setSelectedHome(value);
    setSelectedRoom(''); // Reset room selection
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
            {DEVICE_DETAILS_SETUP.NAVIGATION.TITLE}
          </Typography>
        </View>
        <Typography variant="caption" color={colors.surface} style={styles.stepIndicator}>
          {DEVICE_DETAILS_SETUP.NAVIGATION.STEP_INDICATOR}
        </Typography>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Typography variant="h2" color={colors.text} style={styles.sectionTitle}>
          {DEVICE_DETAILS_SETUP.SECTIONS.DEVICE_DETAILS}
        </Typography>

        {/* Device Name Field */}
        <TextField
          label={DEVICE_DETAILS_SETUP.FIELDS.DEVICE_NAME.LABEL}
          value={deviceName}
          onChangeText={setDeviceName}
          placeholder={DEVICE_DETAILS_SETUP.FIELDS.DEVICE_NAME.PLACEHOLDER}
          error={errors.deviceName}
          accessibilityLabel={DEVICE_DETAILS_SETUP.FIELDS.DEVICE_NAME.LABEL}
          accessibilityHint={`Enter your ${DEVICE_DETAILS_SETUP.FIELDS.DEVICE_NAME.LABEL.toLowerCase()}`}
        />

        {/* Add To Home Dropdown */}
        <Dropdown
          label={DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_HOME.LABEL}
          value={selectedHome}
          onValueChange={handleHomeChange}
          options={homeOptions}
          placeholder={DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_HOME.PLACEHOLDER}
          error={errors.home}
          accessibilityLabel={DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_HOME.LABEL}
          accessibilityHint={`Select ${DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_HOME.LABEL.toLowerCase()}`}
        />

        {/* Add To Room Dropdown */}
        <Dropdown
          label={DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_ROOM.LABEL}
          value={selectedRoom}
          onValueChange={setSelectedRoom}
          options={roomOptions}
          placeholder={DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_ROOM.PLACEHOLDER}
          error={errors.room}
          disabled={!selectedHome}
          accessibilityLabel={DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_ROOM.LABEL}
          accessibilityHint={`Select ${DEVICE_DETAILS_SETUP.FIELDS.ADD_TO_ROOM.LABEL.toLowerCase()}`}
        />

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <AppButton
            variant="primaryLarge"
            title={DEVICE_DETAILS_SETUP.NAVIGATION.NEXT_BUTTON}
            onPress={handleNext}
            accessibilityLabel={DEVICE_DETAILS_SETUP.NAVIGATION.NEXT_BUTTON}
            accessibilityHint="Tap to proceed to next step"
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={bottomNavItems}
        activeKey="home"
        onTabPress={handleTabPress}
      />

      {/* Profile Modal */}
      <ProfilePage
        visible={showProfile}
        userData={user ? {
          name: user.first_name || null,
          email: userEmail,
          profilePicture: user.profile_picture || null,
          homesCount: homes.length
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

export default AddDevice8;
