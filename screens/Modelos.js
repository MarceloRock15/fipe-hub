import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CampoBusca from '../components/CampoBusca';
import ListaItens from '../components/ListaItens';
import LogoMarca from '../components/LogoMarca';
import useCarregar from '../hooks/useCarregar';
import { buscarModelos } from '../services/api';
import { espaco } from '../styles/tema';
import { semAcento } from '../utils/texto';

export default function Modelos({ navigation, route }) {
  const { tipo, marca } = route.params;
  const [busca, setBusca] = useState('');

  const { dados, carregando, erro, tentarNovamente } = useCarregar(
    (signal) => buscarModelos(tipo, marca.code, signal),
    [tipo, marca.code]
  );

  const termo = semAcento(busca.trim());
  const modelosFiltrados = (dados ?? []).filter((modelo) =>
    semAcento(modelo.name).includes(termo)
  );

  return (
    <View style={estilos.tela}>
      <View style={estilos.topo}>
        <CampoBusca valor={busca} aoMudar={setBusca} placeholder="Buscar modelo" />
      </View>
      <ListaItens
        itens={modelosFiltrados}
        carregando={carregando}
        erro={erro}
        renderizarIcone={() => <LogoMarca marca={marca.name} />}
        aoSelecionar={(modelo) => navigation.navigate('Preco', { tipo, marca, modelo })}
        aoTentarNovamente={tentarNovamente}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
  },
  topo: {
    padding: espaco.medio,
    paddingBottom: espaco.pequeno,
  },
});
