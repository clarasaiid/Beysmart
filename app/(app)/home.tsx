import { AppButton } from '@/design-system/Buttons/Buttons'
import { colors } from '@/design-system/colors/colors'
import { HOME_SETUP, SUPPORT_BODY, SUPPORT_EMAIL, SUPPORT_SUBJECT } from '@/design-system/home/Constants'
import { SetupStep, completeSetupStep, resetSetupSteps } from '@/design-system/home/HomeSetupUtils'
import {
  CorrectIcon,
  Door,
  HomeIcon,
  LightIcon,
  LockIcon,
  Robot
} from '@/design-system/icons'
import { Spacing } from '@/design-system/Layout/spacing'
import { BottomNavigation, TopNavigation } from '@/design-system/Navigation'
import type { BottomNavigationItem, Home as DSHome, User as DSUser } from '@/design-system/Navigation/Types'
import { Typography } from '@/design-system/typography/typography'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native'
import ProfilePage from '../(profile actions)/Profile'
import { BASE_URL } from '../../constants/api'
import apiClient from '../../utils/api'

const StepIcon: React.FC<{ step: SetupStep }> = ({ step }) => {
    const size = HOME_SETUP.DIMENSIONS.STEP_ICON.SIZE
    const borderRadius = HOME_SETUP.DIMENSIONS.STEP_ICON.BORDER_RADIUS
  
    const backgroundColor = step.isCompleted
      ? colors.completedstep
      : step.isActive
      ? colors.activestep
      : colors.inactivestep
  
    const IconComponent = useMemo(() => {
      
      const iconColor = step.isCompleted 
        ? colors.surface          
        : step.isActive 
        ? colors.surface           
        : colors.notactiveicon           
      
      switch (step.iconKey) {
        case 'home':
          return <HomeIcon width={22} height={22} color={iconColor} />
        case 'room':
          return <Door width={22} height={22} color={iconColor} />
        case 'lightbulb':
          return <LightIcon width={22} height={22} color={iconColor} />
        case 'robot':
          return <Robot width={22} height={22} color={iconColor} />
        default:
          return <HomeIcon width={22} height={22} color={iconColor} />
      }
    }, [step.iconKey, step.isCompleted, step.isActive]) // Added missing dependencies
  
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: step.isActive ? 0.15 : 0,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: step.isActive ? 2 : 0,
        }}
      >
        {IconComponent}
      </View>
    )
  }
const StatusPill: React.FC<{ step: SetupStep }> = ({ step }) => {
  if (step.isCompleted) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#2E7DFF',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          alignSelf: 'flex-start',
        }}
      >
        <CorrectIcon width={14} height={14} />
        <Typography variant="caption" color={'#FFFFFF'} style={{ marginLeft: 6 }}>
          Completed
        </Typography>
      </View>
    )
  }

  if (step.isLocked) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#EFF1F4',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          alignSelf: 'flex-start',
        }}
      >
        <LockIcon width={14} height={14} />
        <Typography variant="caption" color={'#6B7280'} style={{ marginLeft: 6 }}>
          Locked
        </Typography>
      </View>
    )
  }

  return null
}

const StepRow: React.FC<{
  step: SetupStep
  onAction: (step: SetupStep) => void
  showLine: boolean
}> = ({ step, onAction, showLine }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: HOME_SETUP.SPACING.BETWEEN_STEPS }}>
      <View style={{ alignItems: 'center', width: HOME_SETUP.DIMENSIONS.STEP_ICON.SIZE }}>
        <StepIcon step={step} />
        {showLine && (
          <View
            style={{
              width: HOME_SETUP.DIMENSIONS.TIMELINE_LINE.WIDTH,
              flex: 1,
              backgroundColor: '#D8DCE2',
              marginTop: HOME_SETUP.SPACING.STEP_ICON_MARGIN,
            }}
          />
        )}
      </View>

      <View style={{ flex: 1, marginLeft: HOME_SETUP.SPACING.STEP_ICON_MARGIN }}>
        <Typography variant="h3" style={{ fontSize: 18, lineHeight: 22 }}>
          {step.title}
        </Typography>
        <Typography variant="body" color={'#6B7280'} style={{ marginTop: 6, fontSize: 13, lineHeight: 18 }}>
          {step.description}
        </Typography>

        <View style={{ height: 10 }} />

        {step.isActive && !step.isCompleted ? (
          <AppButton
            variant="primarySmall"
            title={step.actionText}
            onPress={() => onAction(step)}
          />
        ) : (
          <StatusPill step={step} />
        )}
      </View>
    </View>
  )
}

const Header: React.FC<{
  user: DSUser
  homes: DSHome[]
  activeHomeId?: number
  onHomeSelect: (id: number) => void
}> = React.memo(({ user, homes, activeHomeId, onHomeSelect }) => {
  const handleAddHome = useCallback(() => {
    router.push('/(home)/AddHome')
  }, [])

  return (
    <TopNavigation
      user={user}
      homes={homes}
      activeHomeId={activeHomeId}
      onHomeSelect={onHomeSelect}
      onAddHome={handleAddHome}
      onAddMember={() => {}}
      onNotificationPress={() => {}}
    />
  )
})

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams()
  const [steps, setSteps] = useState<SetupStep[]>(() => resetSetupSteps())
  const [activeHomeId, setActiveHomeId] = useState<number | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('home')
  const [user, setUser] = useState<DSUser | null>(null)
  const [userEmail, setUserEmail] = useState<string>('user@example.com')
  const [isLoading, setIsLoading] = useState(true)
  const [homes, setHomes] = useState<DSHome[]>([])
  const [isLoadingHomes, setIsLoadingHomes] = useState(true)
  const [rooms, setRooms] = useState<any[]>([])
  const [isLoadingRooms, setIsLoadingRooms] = useState(true)
  const [showProfile, setShowProfile] = useState(false)

  // Load user data from AsyncStorage
  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData')
      
      if (userDataString) {
        const userData = JSON.parse(userDataString)
        setUser({
          first_name: userData.first_name || undefined, // Will be undefined if no name set
          profile_picture: userData.profile_picture ? `${BASE_URL.replace('/api/', '')}${userData.profile_picture}` : undefined
        })
        // Set email if available
        if (userData.email) {
          setUserEmail(userData.email)
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  // Refresh user data when screen comes into focus (e.g., returning from AccountSettings)
  useFocusEffect(
    useCallback(() => {
      // Only reload if user data is not already loaded
      if (!user) {
        loadUserData()
      }
    }, [loadUserData, user])
  )

  // Load homes from API
  useEffect(() => {
    const loadHomes = async () => {
      try {
        const response = await apiClient.get('home/homes/')
        const homesData = response.data.map((home: any) => ({
          id: home.id,
          name: home.name
        }))
        setHomes(homesData)
        
        // Set first home as active if available
        if (homesData.length > 0) {
          setActiveHomeId(homesData[0].id)
          // Mark the "Add your home" step as completed since user has homes
          setSteps(prevSteps => completeSetupStep(prevSteps, 'add_home'))
        }
      } catch (error: any) {
        console.error('Error loading homes:', error);
        // Keep empty array if API fails
        setHomes([])
      } finally {
        setIsLoadingHomes(false)
      }
    }

    loadHomes()
  }, [])

  // Load rooms from API
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await apiClient.get('home/rooms/')
        setRooms(response.data)
        
        // If user has rooms, mark the "Add your first room" step as completed
        if (response.data.length > 0) {
          setSteps(prevSteps => completeSetupStep(prevSteps, 'add_room'))
        }
      } catch (error: any) {
        console.error('Error loading rooms:', error);
        setRooms([])
      } finally {
        setIsLoadingRooms(false)
      }
    }

    loadRooms()
  }, [])

  // Handle step completion from navigation params
  useEffect(() => {
    if (params.completedStep) {
      const stepId = params.completedStep as string
      setSteps(prevSteps => completeSetupStep(prevSteps, stepId))
    }
    
    // Handle add_room completion
    if (params.add_room === 'true') {
      setSteps(prevSteps => completeSetupStep(prevSteps, 'add_room'))
    }
  }, [params.completedStep, params.add_room])
  const bottomNavItems: BottomNavigationItem[] = [
    { key: 'home', label: 'Home', icon: null },
    { key: 'devices', label: 'Devices', icon: null },
    { key: 'energy', label: 'Energy', icon: null },
    { key: 'profile', label: 'Profile', icon: null },
  ]

  const onAction = useCallback((step: SetupStep) => {
    const canProceed = step.isActive && !step.isCompleted && !step.isLocked
    if (!canProceed) return

    // Handle navigation for specific steps
    if (step.key === 'add_home') {
      router.push('/(home)/AddHome')
      return
    }

    if (step.key === 'add_room') {
      router.push('/(room)/AddRoom')
      return
    }

    // For other steps, complete them normally
    const updated = completeSetupStep(steps, step.id)
    setSteps(updated)
  }, [steps])

  const handleTabPress = useCallback((key: string) => {
    setActiveTab(key)
    if (key === 'profile') {
      setShowProfile(true)
    }
    // Add other tab navigation handlers as needed
  }, [])

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body">Loading...</Typography>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header
        user={user || { first_name: undefined, profile_picture: undefined }}
        homes={homes}
        activeHomeId={activeHomeId}
        onHomeSelect={setActiveHomeId}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.lg,
          paddingBottom: Spacing.md,
        }}
      >
        {steps.map((step, index) => (
          <StepRow
            key={step.id}
            step={step}
            onAction={onAction}
            showLine={index < steps.length - 1}
          />
        ))}

        <View style={{ height: HOME_SETUP.SPACING.AFTER_LAST_STEP }} />

        <View style={{ alignItems: 'center', marginTop: HOME_SETUP.SPACING.HELP_SECTION }}>
  <View style={{ flexDirection: "row" }}>
    <Typography variant="caption" color={'#6B7280'}>
      Need help?
    </Typography>
    <TouchableOpacity
      onPress={() => {
        const email = SUPPORT_EMAIL
        const subject = SUPPORT_SUBJECT
        const body = SUPPORT_BODY
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        Linking.openURL(url).catch(err =>
          console.error("Error opening email app", err)
        )
      }}
    >
      <Typography variant="caption" color={'#2E7DFF'} style={{ marginLeft: 4 }}>
        Contact Support
      </Typography>
    </TouchableOpacity>
  </View>
</View>
      </ScrollView>
      <BottomNavigation
        items={bottomNavItems}
        activeKey={activeTab}
        profile_picture={user?.profile_picture}
        onTabPress={handleTabPress}
      />
      
      {/* Profile Modal */}
      <ProfilePage
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        userData={user ? {
          name: user.first_name || null,
          email: userEmail, // Real user email from stored data
          profilePicture: user.profile_picture || null,
          homesCount: homes.length
        } : undefined}
        onAddDevice={() => {
          setShowProfile(false);
        }}
        onMyHomes={() => {
          setShowProfile(false);
        }}
        onInviteFamily={() => {
          setShowProfile(false);
        }}
        onAccountSettings={() => {
          setShowProfile(false);
        }}
        onHelpSupport={() => {
          setShowProfile(false);
        }}
      />
    </View>
  )
}

export default HomeScreen

