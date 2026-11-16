import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores, espaco } from '../styles/tema';

export default function Card({ titulo, subtitulo, icone, aoPressionar }) {
  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityRole="button"
      style={({ pressed }) => [estilos.card, pressed && estilos.cardPressionado]}
    >
      {icone ? <View style={estilos.icone}>{icone}</View> : null}
      <View style={estilos.textos}>
        <Text style={estilos.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        {subtitulo ? (
          <Text style={estilos.subtitulo} numberOfLines={1}>
            {subtitulo}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 64,
    padding: espaco.pequeno + 4,
    gap: espaco.medio,
    backgroundColor: cores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardPressionado: {
    opacity: 0.7,
  },
  icone: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: cores.tinta,
  },
  subtitulo: {
    marginTop: 2,
    fontSize: 14,
    color: cores.textoSuave,
  },
});
