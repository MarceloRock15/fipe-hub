import { StyleSheet, TextInput } from 'react-native';
import { cores, espaco } from '../styles/tema';

export default function CampoBusca({ valor, aoMudar, placeholder }) {
  return (
    <TextInput
      style={estilos.campo}
      value={valor}
      onChangeText={aoMudar}
      placeholder={placeholder}
      placeholderTextColor={cores.textoSuave}
      autoCorrect={false}
      autoCapitalize="none"
      clearButtonMode="while-editing"
    />
  );
}

const estilos = StyleSheet.create({
  campo: {
    minHeight: 48,
    paddingHorizontal: espaco.medio,
    fontSize: 16,
    color: cores.tinta,
    backgroundColor: cores.superficie,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
});
