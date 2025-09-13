// Home Screen Constants - All hardcoded values moved here for easy customization
import { colors } from '../colors/colors';
// Home Screen Setup Timeline Constants
export const HOME_SETUP = {
  // Step configurations
  STEPS: [
    {
      id: 'add_home',
      key: 'add_home',
      title: 'Add your home',
      description: 'Set up your first smart home!',
      iconKey: 'home',
      actionText: 'Add New Home',
      isCompleted: false,
      isActive: true,
      isLocked: false,
    },
    {
      id: 'add_room',
      key: 'add_room',
      title: 'Add your first room',
      description: 'Lay the ground for smart devices',
      iconKey: 'room',
      actionText: 'Add Room',
      isCompleted: false,
      isActive: false,
      isLocked: true,
    },
    {
      id: 'connect_device',
      key: 'connect_device',
      title: 'Connect your first device',
      description: 'Unlock 10% smarter living!',
      iconKey: 'lightbulb',
      actionText: 'Connect Device',
      isCompleted: false,
      isActive: false,
      isLocked: true,
    },
    {
      id: 'start_using',
      key: 'start_using',
      title: 'Start Using your device',
      description: 'Level up to Home Genius!',
      iconKey: 'robot',
      actionText: 'Start Using',
      isCompleted: false,
      isActive: false,
      isLocked: true,
    },
  ],
  
  // Dimensions
  DIMENSIONS: {
    STEP_ICON: {
      SIZE: 48,
      BORDER_RADIUS: 24,
    },
    STEP_CONTAINER: {
      MIN_HEIGHT: 120,
      PADDING: 20,
    },
    TIMELINE_LINE: {
      WIDTH: 2,
      SPACING: 20,
    },
    ACTION_BUTTON: {
      BORDER_RADIUS: 8,
      PADDING_HORIZONTAL: 16,
      PADDING_VERTICAL: 8,
    },
    COMPLETED_INDICATOR: {
      BORDER_RADIUS: 8,
      PADDING_HORIZONTAL: 16,
      PADDING_VERTICAL: 8,
    },
    LOCKED_INDICATOR: {
      PADDING_HORIZONTAL: 16,
      PADDING_VERTICAL: 8,
    },
    PROGRESS_BAR: {
      BORDER_RADIUS: 4,
    },
  },
  
  // Colors for different states
  COLORS: {
    ACTIVE: {
      BACKGROUND: '#00FF00', // Lime green
      TEXT: colors.text,
      ICON: colors.text,
    },
    COMPLETED: {
      BACKGROUND: '#007AFF', // Blue
      TEXT: colors.surface,
      ICON: colors.surface,
    },
    LOCKED: {
      BACKGROUND: '#E5E5E5', // Light grey
      TEXT: '#666666',
      ICON: '#666666',
    },
    INACTIVE: {
      BACKGROUND: colors.background, // Very light grey
      TEXT: colors.text,
      ICON: colors.text,
    },
  },
  
  // Text constants
  TEXT: {
    HELP_SECTION: {
      PREFIX: 'Need help?',
      LINK: 'Contact Support',
    },
    WELCOME_TITLE: 'Welcome to Smart Home Setup',
    WELCOME_SUBTITLE: 'Let\'s get your smart home up and running in just a few steps!',
  },
  
  // Spacing
  SPACING: {
    BETWEEN_STEPS: 50,
    STEP_CONTENT: 16,
    HELP_SECTION: 0,
    AFTER_LAST_STEP: 0,
    STEP_ICON_MARGIN: 20, // For marginRight in stepIcon
    STEP_ACTION_MARGIN: 68, // For marginLeft in stepAction (48 + 20)
    PROGRESS_BAR_WIDTH: 200,
    PROGRESS_BAR_HEIGHT: 8,
    PROGRESS_BAR_MARGIN: 4,
    COMPLETION_MESSAGE_PADDING: 24,
    COMPLETION_MESSAGE_MARGIN: 16,
    HELP_LINK_PADDING: 16,
  },
  
  // Typography constants
  TYPOGRAPHY: {
    FONT_WEIGHTS: {
      MEDIUM: '500',
      SEMIBOLD: '600',
    },
    LINE_HEIGHTS: {
      STEP_DESCRIPTION: 20,
    },
  },
  
  // Animation constants
  ANIMATION: {
    ACTIVE_OPACITY: 0.8,
  },
} as const;

// Home-specific icon mapping
export const HOME_ICON_MAPPING = {
  home: 'HomeIcon',
  room: 'LivingIcon',
  lightbulb: 'LightIcon',
  robot: 'SettingsIcon',
  check: 'CorrectIcon',
  lock: 'Lock',
} as const;

// Add Home Screen Constants
export const ADD_HOME = {
  // Form fields
  FIELDS: {
    HOME_NAME: {
      LABEL: 'Home Name',
      PLACEHOLDER: 'e.g. Main Home',
      KEY: 'homeName',
    },
    HOME_TYPE: {
      LABEL: 'Home Type',
      PLACEHOLDER: 'Select home type',
      KEY: 'homeType',
      OPTIONS: [
        { label: 'Apartment', value: 'apartment' },
        { label: 'House', value: 'house' },
        { label: 'Condo', value: 'condo' },
        { label: 'Townhouse', value: 'townhouse' },
        { label: 'Studio', value: 'studio' },
      ],
    },
    HOME_LOCATION: {
      LABEL: 'Home Location',
      PLACEHOLDER: 'e.g. Maadi',
      KEY: 'homeLocation',
    },
  },
  
  // Navigation
  NAVIGATION: {
    TITLE: 'Add Home',
    STEP_INDICATOR: 'Step 1 of 2',
    BACK_BUTTON: 'Back',
    NEXT_BUTTON: 'Next',
  },
  
  // Section titles
  SECTIONS: {
    HOME_DETAILS: 'Home Details',
  },
  
  // Validation messages
  VALIDATION: {
    HOME_NAME_REQUIRED: 'Home name is required',
    HOME_TYPE_REQUIRED: 'Please select a home type',
    HOME_LOCATION_REQUIRED: 'Home location is required',
    HOME_NAME_MIN_LENGTH: 'Home name must be at least 2 characters',
    HOME_LOCATION_MIN_LENGTH: 'Location must be at least 2 characters',
  },
  
  
  
  // Dimensions
  DIMENSIONS: {
    HEADER_HEIGHT: 60,
    SECTION_SPACING: 24,
    FIELD_SPACING: 16,
    BUTTON_HEIGHT: 48,
    DROPDOWN_HEIGHT: 48,
  },
  
  // Colors
  COLORS: {
    HEADER_BACKGROUND: colors.navBarBackground,
    SECTION_TITLE: colors.text,
    INPUT_BACKGROUND: colors.surface,
    BUTTON_BACKGROUND: colors.primary.base,
    BUTTON_TEXT: colors.text,
  },
} as const;

// Add Home Done Screen Constants
export const ADD_HOME_DONE = {
  // Content
  CONTENT: {
    TITLE: 'Your Home Is Ready For Setup',
    SUBTITLE: 'Congratulations! Your home has been successfully added.',
  },
  
  // Home Card
  HOME_CARD: {
    TITLE: 'Main Home',
    TYPE: 'Apartment',
    LOCATION: 'Maadi',
    IMAGE_SIZE: 120,
    BORDER_RADIUS: 60,
  },
  
  // Action Buttons
  ACTIONS: {
    EDIT_HOME: {
      TEXT: 'Edit Home Details',
      VARIANT: 'secondaryLarge' as const,
    },
    FINISH_SETUP: {
      TEXT: 'Finish Home Setup',
      VARIANT: 'primaryLarge' as const,
    },
  },
  
  // Dimensions
  DIMENSIONS: {
    CARD_PADDING: 24,
    CARD_MARGIN: 20,
    BUTTON_SPACING: 16,
    CELEBRATION_SIZE: 120,
    HOME_IMAGE_SIZE: 120,
  },
  
  // Colors
  COLORS: {
    CARD_BACKGROUND: colors.disabled,
    CARD_BORDER: colors.inactivestep,
  },
} as const;

// Add Room Screen Constants
export const ADD_ROOM = {
  // Form fields
  FIELDS: {
    ROOM_NAME: {
      LABEL: 'Room Name',
      PLACEHOLDER: 'e.g. Master Bedroom',
      KEY: 'roomName',
    },
    ADDED_TO: {
      LABEL: 'Added To',
      PLACEHOLDER: 'Select home',
      KEY: 'addedTo',
    },
    ROOM_TYPE: {
      LABEL: 'Room Type (Optional)',
      KEY: 'roomType',
      OPTIONS: [
        { label: 'Bedroom', value: 'bedroom', icon: 'BedroomIcon' },
        { label: 'Living', value: 'living', icon: 'LivingIcon' },
        { label: 'Kitchen', value: 'kitchen', icon: 'pots' },
        { label: 'Bath', value: 'bath', icon: 'BathIcon' },
        { label: 'Gym', value: 'gym', icon: 'Gym' },
        { label: 'Garage', value: 'garage', icon: 'Car' },
        { label: 'Office', value: 'office', icon: 'Bag' },
        { label: 'Media', value: 'media', icon: 'Screen' },
        { label: 'Dining', value: 'dining', icon: 'KitchenIcon' },
        { label: 'Closet', value: 'closet', icon: 'Shirt' },
        { label: 'Hallway', value: 'hallway', icon: 'Hallway' },
        { label: 'Other', value: 'other', icon: 'PlusIcon' },
      ],
    },
    ROOM_PHOTO: {
      LABEL: 'Room Photo (Optional)',
      KEY: 'roomPhoto',
    },
      FLOOR: {
        LABEL: 'Choose Floor',
        PLACEHOLDER: '1',
        KEY: 'floor',
        OPTIONS: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '6', value: '6' },
          { label: '7', value: '7' },
          { label: '8', value: '8' },
        ],
      },
    ROOM_DIMENSIONS: {
      LABEL: 'Enter Room Dimensions',
      SUBTITLE: 'Used for energy usage estimates.',
      KEY: 'roomDimensions',
      OPTIONS: [
        { label: 'Small (10 m²)', value: 'small' },
        { label: 'Medium (18 m²)', value: 'medium' },
        { label: 'Large (24 m²)', value: 'large' },
      ],
    },
  },
  
  // Navigation
  NAVIGATION: {
    TITLE: 'Add New Room',
    STEP_INDICATOR: 'Step 2 of 2',
    BACK_BUTTON: 'Back',
    CREATE_BUTTON: 'Create Room',
  },
  
  // Section titles
  SECTIONS: {
    ROOM_DETAILS: 'Room Details',
    ADVANCED_OPTIONS: 'Advanced Options',
  },
  
  // Validation messages
  VALIDATION: {
    ROOM_NAME_REQUIRED: 'Room name is required',
    ADDED_TO_REQUIRED: 'Please select a home',
    ROOM_NAME_MIN_LENGTH: 'Room name must be at least 2 characters',
  },
  
  // API endpoints
  API: {
    CREATE_ROOM: 'room/rooms/',
    GET_HOMES: 'home/homes/',
  },
  
  // Dimensions
  DIMENSIONS: {
    HEADER_HEIGHT: 60,
    SECTION_SPACING: 24,
    FIELD_SPACING: 16,
    BUTTON_HEIGHT: 48,
    DROPDOWN_HEIGHT: 48,
    ROOM_TYPE_GRID_COLUMNS: 3,
    ROOM_TYPE_BUTTON_SIZE: 80,
    PHOTO_UPLOAD_HEIGHT: 120,
  },
  
  // Colors
  COLORS: {
    HEADER_BACKGROUND: colors.navBarBackground,
    SECTION_TITLE: colors.text,
    INPUT_BACKGROUND: colors.surface,
    BUTTON_BACKGROUND: colors.primary.base,
    BUTTON_TEXT: colors.text,
    ROOM_TYPE_SELECTED: colors.primary.base,
    ROOM_TYPE_UNSELECTED: colors.border,
  },
} as const;

// Room accessibility constants
export const ROOM_ACCESSIBILITY = {
  LABELS: {
    ADD_ROOM_FORM: 'Add room form',
    ROOM_NAME_INPUT: 'Room name input',
    ADDED_TO_DROPDOWN: 'Added to dropdown',
    ROOM_TYPE_GRID: 'Room type selection grid',
    ROOM_TYPE_BUTTON: 'Room type button',
    ROOM_PHOTO_UPLOAD: 'Room photo upload',
    FLOOR_DROPDOWN: 'Floor dropdown',
    DIMENSIONS_OPTIONS: 'Room dimensions options',
    CREATE_BUTTON: 'Create room button',
  },
  HINTS: {
    ADD_ROOM_FORM: 'Form to add a new room',
    ROOM_NAME_INPUT: 'Enter your room name',
    ADDED_TO_DROPDOWN: 'Select which home to add room to',
    ROOM_TYPE_GRID: 'Select room type from grid',
    ROOM_TYPE_BUTTON: 'Tap to select room type',
    ROOM_PHOTO_UPLOAD: 'Tap to add room photo',
    FLOOR_DROPDOWN: 'Select floor number',
    DIMENSIONS_OPTIONS: 'Select room size for energy estimates',
    CREATE_BUTTON: 'Tap to create the room',
  },
} as const;

// Home accessibility constants
export const HOME_ACCESSIBILITY = {
  LABELS: {
    SETUP_STEP: 'Setup step',
    STEP_ACTION: 'Step action button',
    HELP_LINK: 'Contact support link',
    ADD_HOME_FORM: 'Add home form',
    HOME_NAME_INPUT: 'Home name input',
    HOME_TYPE_DROPDOWN: 'Home type dropdown',
    HOME_LOCATION_INPUT: 'Home location input',
    NEXT_BUTTON: 'Next button',
    HOME_CARD: 'Home details card',
    EDIT_BUTTON: 'Edit home details button',
    FINISH_BUTTON: 'Finish home setup button',
  },
  HINTS: {
    SETUP_STEP: 'Setup step information',
    STEP_ACTION: 'Tap to complete this step',
    HELP_LINK: 'Tap to contact support',
    ADD_HOME_FORM: 'Form to add a new home',
    HOME_NAME_INPUT: 'Enter your home name',
    HOME_TYPE_DROPDOWN: 'Select your home type',
    HOME_LOCATION_INPUT: 'Enter your home location',
    NEXT_BUTTON: 'Tap to proceed to next step',
    HOME_CARD: 'Home information display',
    EDIT_BUTTON: 'Tap to edit home details',
    FINISH_BUTTON: 'Tap to complete home setup',
  },
} as const;
