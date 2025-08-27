import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import {
    BathIcon,
    BedroomIcon,
    EnergyIcon,
    HomeIcon,
    KitchenIcon,
    LightIcon,
    LivingIcon,
    SettingsIcon
} from '../../design-system/icons/filled';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const HomeScreen = () => {
  const quickActions = [
    { icon: <LightIcon width={24} height={24} color={colors.primary.base} />, title: 'All Lights', count: '12' },
    { icon: <HomeIcon width={24} height={24} color={colors.primary.base} />, title: 'Climate', count: '22°C' },
    { icon: <SettingsIcon width={24} height={24} color={colors.primary.base} />, title: 'Security', count: 'Armed' },
    { icon: <EnergyIcon width={24} height={24} color={colors.primary.base} />, title: 'Energy', count: '2.1kWh' },
  ];

  const rooms = [
    { icon: <LivingIcon width={32} height={32} color={colors.text} />, name: 'Living Room', devices: 8, active: true },
    { icon: <KitchenIcon width={32} height={32} color={colors.text} />, name: 'Kitchen', devices: 6, active: false },
    { icon: <BedroomIcon width={32} height={32} color={colors.text} />, name: 'Bedroom', devices: 4, active: true },
    { icon: <BathIcon width={32} height={32} color={colors.text} />, name: 'Bathroom', devices: 3, active: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="h1" style={styles.greeting}>
              Good Morning! 👋
            </Typography>
            <Typography variant="body" style={styles.subtitle}>
              Welcome to your smart home
            </Typography>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Typography variant="body" style={styles.profileInitial}>
                U
              </Typography>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Quick Actions
          </Typography>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <View style={styles.quickActionIcon}>
                  {action.icon}
                </View>
                <Typography variant="caption" style={styles.quickActionTitle}>
                  {action.title}
                </Typography>
                <Typography variant="body" style={styles.quickActionCount}>
                  {action.count}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rooms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Rooms
            </Typography>
            <TouchableOpacity>
              <Typography variant="body" style={styles.seeAllText}>
                See All
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.roomsGrid}>
            {rooms.map((room, index) => (
              <TouchableOpacity key={index} style={[styles.roomCard, room.active && styles.roomCardActive]}>
                <View style={styles.roomIcon}>
                  {room.icon}
                </View>
                <Typography variant="body" style={styles.roomName}>
                  {room.name}
                </Typography>
                <Typography variant="caption" style={styles.roomDevices}>
                  {room.devices} devices
                </Typography>
                {room.active && (
                  <View style={styles.activeIndicator}>
                    <Typography variant="caption" style={styles.activeText}>
                      Active
                    </Typography>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Device Button */}
        <View style={styles.addDeviceSection}>
          <AppButton
            variant="primaryLarge"
            title="Add New Device"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Padding.screenHorizontal.paddingHorizontal,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  greeting: {
    color: colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: colors.secondaryText,
  },
  profileButton: {
    padding: Spacing.sm,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: colors.text,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: Padding.screenHorizontal.paddingHorizontal,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: colors.text,
  },
  seeAllText: {
    color: colors.primary.base,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  quickActionIcon: {
    marginBottom: Spacing.sm,
  },
  quickActionTitle: {
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  quickActionCount: {
    color: colors.text,
    fontWeight: 'bold',
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  roomCardActive: {
    backgroundColor: colors.primary.lighter,
    borderColor: colors.primary.base,
    borderWidth: 1,
  },
  roomIcon: {
    marginBottom: Spacing.sm,
  },
  roomName: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  roomDevices: {
    color: colors.secondaryText,
  },
  activeIndicator: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: colors.primary.base,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  addDeviceSection: {
    paddingHorizontal: Padding.screenHorizontal.paddingHorizontal,
    paddingBottom: Spacing.xl,
  },
});

export default HomeScreen;
