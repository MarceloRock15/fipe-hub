import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Splash from './components/Splash';
import Marcas from './screens/Marcas';
import Modelos from './screens/Modelos';
import Preco from './screens/Preco';
import { cores } from './styles/tema';

const Stack = createNativeStackNavigator();

export default function App() {
  const [splashVisivel, setSplashVisivel] = useState(true);

  if (splashVisivel) {
    return (
      <>
        <StatusBar style="dark" />
        <Splash aoTerminar={() => setSplashVisivel(false)} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: cores.tinta },
          headerTintColor: cores.textoSobreDestaque,
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="Marcas" component={Marcas} options={{ title: 'FipeHub' }} />
        <Stack.Screen
          name="Modelos"
          component={Modelos}
          options={({ route }) => ({ title: route.params.marca.name })}
        />
        <Stack.Screen name="Preco" component={Preco} options={{ title: 'Preço FIPE' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
