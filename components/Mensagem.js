import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Botao from './Botao';
import { cores, espaco } from '../styles/tema';

export default function Mensagem({ tipo, texto, aoPressionar }) {
  return (
    <View style={estilos.container}>
      {tipo === 'carregando' && <ActivityIndicator size="large" color={cores.destaque} />}
      <Text style={[estilos.texto, tipo === 'erro' && estilos.textoErro]}>{texto}</Text>
      {tipo === 'erro' && aoPressionar && (
        <Botao titulo="Tentar de novo" aoPressionar={aoPressionar} />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaco.grande,
    gap: espaco.medio,
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
    color: cores.textoSuave,
  },
  textoErro: {
    color: cores.erro,
  },
});
