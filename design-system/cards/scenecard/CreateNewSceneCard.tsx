import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PlusIcon from '../../icons/filled/PlusIcon';

const CreateNewSceneCard = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <PlusIcon width={24} height={24} />
      </View>
      <Text style={styles.text}>Create New Scene</Text>
    </TouchableOpacity>
  );
};

export default CreateNewSceneCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderStyle: 'dashed',
    padding: 16,
    minWidth: 280,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    backgroundColor: '#374151',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  text: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
});