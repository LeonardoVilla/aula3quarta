import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBand} />
      <View style={styles.bottomBand} />
      <Ionicons name="school" size={64} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.title}>Gerenciamento Escolar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005CA9',
    paddingHorizontal: 24,
  },
  topBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#98b9c4',
  },
  bottomBand: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#98b9c4',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  icon: {
    marginBottom: 14,
  },
});
