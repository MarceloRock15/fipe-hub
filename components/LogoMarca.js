import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { cores } from '../styles/tema';
import { iniciais, urlLogo } from '../utils/logo';

export default function LogoMarca({ marca }) {
  const [falhou, setFalhou] = useState(false);
  const uri = urlLogo(marca);

  if (!uri || falhou) {
    return (
      <View style={estilos.circulo}>
        <Text style={estilos.iniciais}>{iniciais(marca)}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={estilos.logo}
      resizeMode="contain"
      onError={() => setFalhou(true)}
    />
  );
}

const estilos = StyleSheet.create({
  logo: {
    width: 44,
    height: 44,
  },
  circulo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  iniciais: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.textoSuave,
  },
});
