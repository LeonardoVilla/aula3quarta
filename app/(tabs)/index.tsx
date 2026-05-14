import { ScrollView, StyleSheet, Text, View } from 'react-native';

const SENAC = {
  blue: '#004A8D',
  orange: '#F7941D',
  background: '#F5F8FC',
  text: '#1F2937',
  white: '#FFFFFF',
  lightText: '#E5EDF7',
  shadow: '#000000',
};

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTag}>SENAC DN</Text>
        <Text style={styles.heroTitle}>Bem-vindo ao Portal Acadêmico</Text>
        <Text style={styles.heroSubtitle}>
          Gestão simples, moderna e alinhada à identidade institucional.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Acesso rápido</Text>
        <Text style={styles.cardText}>Use as abas para cadastrar, consultar e atualizar alunos.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Padrão visual Senac</Text>
        <Text style={styles.cardText}>
          Interface limpa com destaque em azul institucional e laranja de apoio.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SENAC.background,
    flexGrow: 1,
    padding: 20,
    gap: 16,
  },
  hero: {
    backgroundColor: SENAC.blue,
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  heroTag: {
    color: SENAC.white,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: SENAC.white,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  heroSubtitle: {
    color: SENAC.lightText,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: SENAC.white,
    borderLeftWidth: 4,
    borderLeftColor: SENAC.orange,
    borderRadius: 12,
    padding: 16,
    gap: 6,
    shadowColor: SENAC.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    color: SENAC.blue,
    fontSize: 17,
    fontWeight: '700',
  },
  cardText: {
    color: SENAC.text,
    fontSize: 15,
    lineHeight: 22,
  },
});
