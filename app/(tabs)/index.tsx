import { ScrollView, StyleSheet, Text, View } from 'react-native';

const SENAC = {
  azul: '#004A8D',
  laranja: '#F7941D',
  fundo: '#F5F8FC',
  texto: '#1F2937',
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
    backgroundColor: SENAC.fundo,
    flexGrow: 1,
    padding: 20,
    gap: 16,
  },
  hero: {
    backgroundColor: SENAC.azul,
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  heroTag: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  heroSubtitle: {
    color: '#E5EDF7',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: SENAC.laranja,
    borderRadius: 12,
    padding: 16,
    gap: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    color: SENAC.azul,
    fontSize: 17,
    fontWeight: '700',
  },
  cardText: {
    color: SENAC.texto,
    fontSize: 15,
    lineHeight: 22,
  },
});
