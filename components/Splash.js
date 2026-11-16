import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function Splash({ aoTerminar }) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const animacao = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacidade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(escala, { toValue: 1, useNativeDriver: true }),
      ]),
      Animated.delay(900),
      Animated.timing(opacidade, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]);

    animacao.start(({ finished }) => {
      if (finished) {
        aoTerminar();
      }
    });

    return () => animacao.stop();
  }, []);

  return (
    <View style={estilos.tela}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[estilos.logo, { opacity: opacidade, transform: [{ scale: escala }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: '50%',
    aspectRatio: 1,
  },
});
