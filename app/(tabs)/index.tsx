import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { DeviceCard } from '../../design-system/cards/devicecard/devicecard'
import * as Icons from '../../design-system/icons'
import { DeviceList } from '../../design-system/List'


const IconGalleryScreen = () => {
  const [isOn, setIsOn] = useState(true);

  const myDevices = [
    {
      id: '1',
      title: 'Living Room Light',
      type: 'BEY-SWITCH',
      iconName: 'FilledLightIcon',
      iconBackgroundColor: '#CFFF5E',
      iconColor: '#1A1A1A',
      initialState: true,
    },
    {
      id: '2',
      title: 'Smart TV ',
      type: 'BEY-PLUG',
      iconName: 'FilledHomeIcon',
      iconBackgroundColor: '#E5E5E5',
      iconColor: '#6E6E6E',
      initialState: false,
    },
    {
      id: '3',
      title: 'Front Door',
      type: 'BEY-LOCK',
      iconName: 'FilledSettingsIcon',
      iconBackgroundColor: '#B87EED',
      iconColor: '#FFFFFF',
      initialState: true,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Device List Testing */}
      <View style={{ width: '100%', marginBottom: 32 }}>
        <DeviceList title="Device List Items" devices={myDevices} />
      </View>

      {/* Original Device Card */}
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

      {/* Icon Gallery */}
      <View style={styles.iconGallery}>
        {Object.entries(Icons).map(([name, IconComponent]) => (
          <View key={name} style={styles.iconBox}>
            <IconComponent width={24} height={24} />
            <Text style={styles.label}>{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
  },
  iconGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
