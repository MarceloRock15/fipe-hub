import { Pressable, StyleSheet, Text } from 'react-native';
import { cores, espaco } from '../styles/tema';

export default function Botao({ titulo, aoPressionar, selecionado = false }) {
  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityRole="button"
      style={({ pressed }) => [
        estilos.botao,
        selecionado && estilos.botaoSelecionado,
        pressed && estilos.botaoPressionado,
      ]}
    >
      <Text style={[estilos.texto, selecionado && estilos.textoSelecionado]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    minHeight: 44,
    paddingHorizontal: espaco.medio,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSelecionado: {
    backgroundColor: cores.destaque,
    borderColor: cores.destaque,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  texto: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.tinta,
  },
  textoSelecionado: {
    color: cores.textoSobreDestaque,
  },
});
