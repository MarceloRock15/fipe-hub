import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco } from '../styles/tema';

export default function Informacao({ rotulo, valor }) {
  return (
    <View style={estilos.linha}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.valor}>{valor}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    paddingVertical: espaco.pequeno + 4,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  rotulo: {
    fontSize: 14,
    color: cores.textoSuave,
  },
  valor: {
    marginTop: 2,
    fontSize: 17,
    color: cores.tinta,
  },
});
