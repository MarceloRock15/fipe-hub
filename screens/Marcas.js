import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Botao from '../components/Botao';
import CampoBusca from '../components/CampoBusca';
import ListaItens from '../components/ListaItens';
import LogoMarca from '../components/LogoMarca';
import { tipos } from '../data/tipos';
import useCarregar from '../hooks/useCarregar';
import { buscarMarcas } from '../services/api';
import { espaco } from '../styles/tema';
import { semAcento } from '../utils/texto';

export default function Marcas({ navigation }) {
  const [tipo, setTipo] = useState(tipos[0].valor);
  const [busca, setBusca] = useState('');

  const { dados, carregando, erro, tentarNovamente } = useCarregar(
    (signal) => buscarMarcas(tipo, signal),
    [tipo]
  );

  const termo = semAcento(busca.trim());
  const marcasFiltradas = (dados ?? []).filter((marca) => semAcento(marca.name).includes(termo));

  return (
    <View style={estilos.tela}>
      <View style={estilos.topo}>
        <CampoBusca valor={busca} aoMudar={setBusca} placeholder="Buscar marca" />
        <View style={estilos.filtros}>
          {tipos.map((item) => (
            <Botao
              key={item.valor}
              titulo={item.rotulo}
              selecionado={tipo === item.valor}
              aoPressionar={() => setTipo(item.valor)}
            />
          ))}
        </View>
      </View>
      <ListaItens
        itens={marcasFiltradas}
        carregando={carregando}
        erro={erro}
        renderizarIcone={(marca) => <LogoMarca marca={marca.name} />}
        aoSelecionar={(marca) => navigation.navigate('Modelos', { tipo, marca })}
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
    gap: espaco.medio - 4,
  },
  filtros: {
    flexDirection: 'row',
    gap: espaco.pequeno,
  },
});
