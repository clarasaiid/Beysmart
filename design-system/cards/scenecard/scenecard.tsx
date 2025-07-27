import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SceneCardProps {
  title: string;
  icons: React.ReactNode[];
  onPressButton: () => void;
  buttonText?: string;
  gradientColors?: string[];
  backgroundColor?: string;
  titleColor?: string;
  buttonTextColor?: string;
  iconColor?: string;
  cardStyle?: object;
}

const SceneCard: React.FC<SceneCardProps> = ({
  title,
  icons,
  onPressButton,
  buttonText = 'Activate',
  gradientColors,
  backgroundColor = '#1F2937',
  titleColor = 'white',
  buttonTextColor = '#9E8DFF',
  iconColor = '#CFFF5E',
  cardStyle = {},
}) => {
  return (
    <>
      {gradientColors ? (
        <LinearGradient colors={gradientColors as [string, string, ...string[]]} style={[styles.card, cardStyle]}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>

          <View style={styles.bottomRow}>
            <View style={styles.iconsRow}>
              {icons.map((icon, idx) => {
                const finalIconColor = (icon as any).props?.color || iconColor;
                return (
                  <View key={idx} style={styles.iconWrapper}>
                    {React.cloneElement(icon as React.ReactElement<any>, { 
                      color: finalIconColor,
                      key: `icon-${idx}`
                    })}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity onPress={onPressButton} style={styles.button}>
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.card, { backgroundColor }, cardStyle]}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>

          <View style={styles.bottomRow}>
            <View style={styles.iconsRow}>
              {icons.map((icon, idx) => {
                const finalIconColor = (icon as any).props?.color || iconColor;
                return (
                  <View key={idx} style={styles.iconWrapper}>
                    {React.cloneElement(icon as React.ReactElement<any>, { 
                      color: finalIconColor,
                      key: `icon-${idx}`
                    })}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity onPress={onPressButton} style={styles.button}>
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default SceneCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'column',
    minWidth: 280,
    minHeight: 100,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconWrapper: {
    backgroundColor: '#111827',
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  
  button: {
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#9E8DFF',
    fontWeight: '600',
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
});
