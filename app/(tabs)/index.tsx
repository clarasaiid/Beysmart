import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { DeviceCard } from '../../design-system/cards/devicecard/devicecard'
import * as Icons from '../../design-system/icons'

const IconGalleryScreen = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: '100%', marginBottom: 32 }}>
        <DeviceCard
          title="Living Room Lights"
          status={isOn ? 'Currently on' : 'Currently off'}
          statusColor={isOn ? '#CFFF5E' : '#6E6E6E'}
          power={isOn ? '18W' : '0W'}
          iconName="LightIcon"
          iconColor="#CFFF5E"
          switchValue={isOn}
          onSwitchChange={setIsOn}
        />
      </View>
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <View key={name} style={styles.iconBox}>
          <IconComponent width={24} height={24} />
          <Text style={styles.label}>{name}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
    justifyContent: 'flex-start'
  },
  iconBox: {
    width: 72,
    alignItems: 'center',
    marginBottom: 24
  },
  label: {
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center'
  }
})

export default IconGalleryScreen
