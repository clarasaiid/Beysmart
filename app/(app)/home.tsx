import { AppButton } from '@/design-system/Buttons/Buttons'
import { colors } from '@/design-system/colors/colors'
import { HOME_SETUP,} from '@/design-system/home/Constants'
import { SetupStep, resetSetupSteps, completeSetupStep } from '@/design-system/home/HomeSetupUtils'
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
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'

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
}> = ({ user, homes, activeHomeId, onHomeSelect }) => {
  const handleAddHome = () => {
    router.push('/(home)/AddHome')
  }

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
}

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams()
  const [steps, setSteps] = useState<SetupStep[]>(() => resetSetupSteps())
  const [activeHomeId, setActiveHomeId] = useState<number | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('home')

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

  const sampleUser: DSUser = { first_name: 'Alexander', profile_picture: undefined }
  const sampleHomes: DSHome[] = []
  const bottomNavItems: BottomNavigationItem[] = [
    { key: 'home', label: 'Home', icon: null },
    { key: 'devices', label: 'Devices', icon: null },
    { key: 'energy', label: 'Energy', icon: null },
    { key: 'profile', label: 'Profile', icon: null },
  ]

  const onAction = (step: SetupStep) => {
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
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header
        user={sampleUser}
        homes={sampleHomes}
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
          <Typography variant="caption" color={'#6B7280'}>
            {HOME_SETUP.TEXT.HELP_SECTION.PREFIX} <Typography variant="caption" color={'#2E7DFF'}>Contact Support</Typography>
          </Typography>
        </View>
      </ScrollView>
      <BottomNavigation
        items={bottomNavItems}
        activeKey={activeTab}
        profile_picture={sampleUser.profile_picture}
        onTabPress={setActiveTab}
      />
    </View>
  )
}

export default HomeScreen

