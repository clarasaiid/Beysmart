import { Text, TouchableOpacity, View } from 'react-native';
import { buttonStyles } from './buttonstyle';

type ButtonVariant = keyof typeof buttonStyles;

type ButtonStyle = {
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  disabledBackgroundColor?: string;
  width?: number;
  height?: number;
  borderWidth?: number;
  borderColor?: string;
};

interface ButtonProps {
  variant: ButtonVariant;
  title?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export const AppButton: React.FC<ButtonProps> = ({
  variant,
  title,
  icon,
  onPress,
  disabled = false,
}) => {
  const variantStyle = buttonStyles[variant] as ButtonStyle;
  const isIconOnly = variant.startsWith('iconOnly');
  const isTextOnly = variant.startsWith('textOnly');

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled
          ? variantStyle.disabledBackgroundColor ?? variantStyle.backgroundColor
          : variantStyle.backgroundColor,
        borderRadius: variantStyle.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // <- prevents stretching
      
        ...(isIconOnly
          ? {
              width: variantStyle.width,
              height: variantStyle.height,
              borderWidth: variantStyle.borderWidth ?? 0,
              borderColor: variantStyle.borderColor ?? 'transparent',
              flexDirection: 'column',
            }
          : {
              paddingVertical: variantStyle.paddingVertical ?? 12,
              paddingHorizontal: variantStyle.paddingHorizontal ?? 16,
              flexDirection: 'row',
            }),
      }}
    >
      {/* Icon */}
      {icon && (
        <View
        style={{
          marginRight: title && !isIconOnly ? 8 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: isIconOnly ? '100%' : undefined,
          height: isIconOnly ? '100%' : undefined,
        }}
      >
        {icon}
      </View>
      
      )}

      {/* Title */}
      {!isIconOnly && title && (
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
