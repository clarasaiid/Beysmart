// design-system/components/buttons.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { buttonStyles } from './buttonstyle';

type ButtonVariant =
  | 'primaryLarge'
  | 'primaryMedium'
  | 'primarySmall'
  | 'primaryPressed'
  | 'primaryDisabled'
  | 'secondaryLarge'
  | 'secondaryMedium'
  | 'secondarySmall'
  | 'secondaryPressed'
  | 'secondaryDisabled';
interface ButtonProps {
  variant: ButtonVariant;
  title?: string;
  icon?: React.ReactNode; // Can be passed later when icons are ready
  onPress?: () => void;
  disabled?: boolean;
}

export const AppButton: React.FC<ButtonProps> = ({
  variant,
  title,
  icon,
  onPress,
  disabled = false,
}) => {
  const variantStyle = buttonStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled
          ? variantStyle.disabledBackgroundColor
          : variantStyle.backgroundColor,
        paddingVertical: variantStyle.paddingVertical,
        paddingHorizontal: variantStyle.paddingHorizontal,
        borderRadius: variantStyle.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon && <View style={{ marginRight: title ? 8 : 0 }}>{icon}</View>}
      {title && (
        <Text
          style={{
            color: variantStyle.textColor,
            fontSize: variantStyle.fontSize,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
