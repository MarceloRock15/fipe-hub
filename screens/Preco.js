import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/Botao';
import Informacao from '../components/Informacao';
import Mensagem from '../components/Mensagem';
import useCarregar from '../hooks/useCarregar';
import { buscarAnos, buscarPreco } from '../services/api';
import { cores, espaco } from '../styles/tema';

export default function Preco({ route }) {
  const { tipo, marca, modelo } = route.params;
  const [ano, setAno] = useState(null);

  const anos = useCarregar(
    (signal) => buscarAnos(tipo, marca.code, modelo.code, signal),
    [tipo, marca.code, modelo.code]
  );

  const preco = useCarregar(
    (signal) =>
      ano ? buscarPreco(tipo, marca.code, modelo.code, ano.code, signal) : Promise.resolve(null),
    [ano]
  );

  const renderizarPreco = () => {
    if (!ano) {
      return <Mensagem tipo="vazio" texto="Escolha um ano acima para ver o valor." />;
    }
    if (preco.erro) {
      return (
        <Mensagem
          tipo="erro"
          texto="Não foi possível consultar o preço."
          aoPressionar={preco.tentarNovamente}
        />
      );
    }
    if (preco.carregando || !preco.dados) {
      return <Mensagem tipo="carregando" texto="Consultando preço..." />;
    }
    const { price, fuel, modelYear, codeFipe, referenceMonth } = preco.dados;
    return (
      <View style={estilos.resultado}>
        <Text style={estilos.preco}>{price}</Text>
        <Informacao rotulo="Combustível" valor={fuel} />
        <Informacao rotulo="Ano do modelo" valor={String(modelYear)} />
        <Informacao rotulo="Código FIPE" valor={codeFipe} />
        <Informacao rotulo="Mês de referência" valor={referenceMonth} />
        <Text style={estilos.aviso}>
          Valor de referência da tabela FIPE, não é preço de venda.
        </Text>
      </View>
    );
  };

  if (anos.carregando) {
    return <Mensagem tipo="carregando" texto="Carregando anos disponíveis..." />;
  }
  if (anos.erro || !anos.dados) {
    return (
      <Mensagem
        tipo="erro"
        texto="Não foi possível carregar os anos deste modelo."
        aoPressionar={anos.tentarNovamente}
      />
    );
  }
  if (anos.dados.length === 0) {
    return <Mensagem tipo="vazio" texto="Nenhum ano disponível para este modelo." />;
  }

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.marca}>{marca.name}</Text>
        <Text style={estilos.modelo}>{modelo.name}</Text>
      </View>
      <FlatList
        horizontal
        data={anos.dados}
        keyExtractor={(item) => String(item.code)}
        showsHorizontalScrollIndicator={false}
        style={estilos.anos}
        contentContainerStyle={estilos.anosConteudo}
        renderItem={({ item }) => (
          <Botao
            titulo={item.name}
            selecionado={ano?.code === item.code}
            aoPressionar={() => setAno(item)}
          />
        )}
      />
      {renderizarPreco()}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flexGrow: 1,
  },
  cabecalho: {
    padding: espaco.medio,
    paddingBottom: espaco.pequeno,
  },
  marca: {
    fontSize: 14,
    color: cores.textoSuave,
  },
  modelo: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '700',
    color: cores.tinta,
  },
  anos: {
    flexGrow: 0,
  },
  anosConteudo: {
    paddingHorizontal: espaco.medio,
    paddingBottom: espaco.pequeno,
    gap: espaco.pequeno,
  },
  resultado: {
    padding: espaco.medio,
  },
  preco: {
    marginBottom: espaco.pequeno,
    fontSize: 32,
    fontWeight: '800',
    color: cores.destaque,
  },
  aviso: {
    marginTop: espaco.medio,
    fontSize: 13,
    color: cores.textoSuave,
  },
});
