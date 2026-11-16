import { FlatList, StyleSheet } from 'react-native';
import Card from './Card';
import Mensagem from './Mensagem';
import { espaco } from '../styles/tema';

export default function ListaItens({
  itens,
  carregando,
  erro,
  renderizarIcone,
  aoSelecionar,
  aoTentarNovamente,
}) {
  if (carregando) {
    return <Mensagem tipo="carregando" texto="Carregando..." />;
  }
  if (erro) {
    return (
      <Mensagem
        tipo="erro"
        texto="Não foi possível carregar os dados. Verifique sua conexão."
        aoPressionar={aoTentarNovamente}
      />
    );
  }
  if (itens.length === 0) {
    return <Mensagem tipo="vazio" texto="Nenhum resultado encontrado." />;
  }
  return (
    <FlatList
      data={itens}
      keyExtractor={(item) => String(item.code)}
      contentContainerStyle={estilos.lista}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Card
          titulo={item.name}
          icone={renderizarIcone(item)}
          aoPressionar={() => aoSelecionar(item)}
        />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    padding: espaco.medio,
    paddingTop: espaco.pequeno,
    gap: espaco.pequeno,
  },
});
