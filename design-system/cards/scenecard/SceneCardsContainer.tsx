import { ScrollView } from 'react-native';
import { FilledBathIcon, FilledBedroomIcon, FilledHomeIcon, FilledKitchenIcon, FilledLightIcon, FilledLivingIcon, FilledSettingsIcon, StarIcon, TimeIcon } from '../../icons';
import CreateNewSceneCard from './CreateNewSceneCard';
import SceneCard from './scenecard';

const SceneCardsContainer = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
    >
      {/* Good Morning Scene - Light, Star, Time icons */}
      <SceneCard
        title="Good Morning"
        gradientColors={['#A78BFA', '#7DD3FC']}
        titleColor="white"
        icons={[<FilledLightIcon width={16} height={16} />, <StarIcon width={16} height={16} />, <TimeIcon width={16} height={16} />]}
        onPressButton={() => {}}
        cardStyle={{ width: 280, minWidth: 280 }}
      />
      
      {/* Sleep Mode Scene - Home, Bedroom, Settings icons */}
      <SceneCard
        title="Sleep Mode"
        gradientColors={['#000000', '#4B5563']}
        titleColor="white"
        icons={[<FilledHomeIcon width={16} height={16} />, <FilledBedroomIcon width={16} height={16} />, <FilledSettingsIcon width={16} height={16} />]}
        onPressButton={() => {}}
        cardStyle={{ width: 280, minWidth: 280 }}
      />
      
      {/* Kitchen Scene - Kitchen, Light, Time icons */}
      <SceneCard
        title="Kitchen Mode"
        backgroundColor="#CFFF5E"
        titleColor="black"
        buttonTextColor="#000000"
        icons={[<FilledKitchenIcon width={16} height={16} />, <FilledLightIcon width={16} height={16} />, <TimeIcon width={16} height={16} />]}
        onPressButton={() => {}}
        cardStyle={{ width: 280, minWidth: 280 }}
      />
      
      {/* Bathroom Scene - Bath, Light, Settings icons */}
      <SceneCard
        title="Bathroom"
        backgroundColor="#F59E0B"
        titleColor="white"
        buttonTextColor="#000000"
        icons={[<FilledBathIcon width={16} height={16} />, <FilledLightIcon width={16} height={16} />, <FilledSettingsIcon width={16} height={16} />]}
        onPressButton={() => {}}
        cardStyle={{ width: 280, minWidth: 280 }}
      />
      
      {/* Living Room Scene - Living, Star, Light icons */}
      <SceneCard
        title="Living Room"
        gradientColors={['#10B981', '#3B82F6']}
        titleColor="white"
        iconColor="#FFD700"
        icons={[<FilledLivingIcon width={16} height={16} />, <StarIcon width={16} height={16} />, <FilledLightIcon width={16} height={16} />]}
        onPressButton={() => {}}
        cardStyle={{ width: 280, minWidth: 280 }}
      />
      
      {/* Custom Scene with Individual Icon Colors */}
      <SceneCard
        title="Custom Scene"
        backgroundColor="#8B5CF6"
        titleColor="white"
        icons={[
          <FilledLightIcon width={16} height={16} color="#FF6B6B" />,
          <StarIcon width={16} height={16} color="#4ECDC4" />,
          <TimeIcon width={16} height={16} color="#45B7D1" />
        ]}
        onPressButton={() => {}}
        cardStyle={{ width: 280, minWidth: 280 }}
      />
      
      <CreateNewSceneCard onPress={() => {}} />
    </ScrollView>
  );
};

export default SceneCardsContainer;
