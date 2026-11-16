# FipeHub

## Descrição

Aplicativo mobile feito com React Native e Expo para consultar o valor de referência da tabela FIPE. O usuário escolhe o tipo de veículo (carros, motos ou caminhões), a marca, o modelo e o ano, e vê o preço, o combustível, o código FIPE e o mês de referência.

## Aluno

Marcelo da Rocha de Souza; RGM: 42772893

## Telas

- **Splash:** abertura animada com a logo do app, exibida por cerca de 2 segundos (`components/Splash.js`, controlada em `App.js`).
- **Marcas:** lista de marcas com busca por nome e filtro por tipo de veículo.
- **Modelos:** lista de modelos da marca escolhida, com busca por nome. O título do cabeçalho é o nome da marca.
- **Preço:** mostra os anos disponíveis do modelo e, ao escolher um, o valor FIPE, o combustível, o código FIPE e o mês de referência.

## Fonte de dados

API pública da tabela FIPE (`https://fipe.parallelum.com.br/api/v2`), sem chave de acesso. Os valores são de referência mensal, não preços de venda.

Logos das marcas: repositório `car-logos-dataset` (licença MIT; as logos pertencem aos respectivos donos), carregadas pela internet. Quando uma marca não tem logo, o app mostra as iniciais dela em um círculo.

## Onde estão os requisitos

- Componentes: `components/` (`Card.js`, `Botao.js`, `CampoBusca.js`, `Mensagem.js`, `Informacao.js`, `ListaItens.js`, `LogoMarca.js`, `Splash.js`). O `Card` é reutilizado em cada item das listas de marcas e modelos, e o `Botao` nos filtros de tipo, nos anos e no "Tentar de novo".
- Props com callback: `aoPressionar` no `Card` e no `Botao`, `aoMudar` no `CampoBusca` e `aoSelecionar` no `ListaItens`.
- useState: `screens/Marcas.js` (tipo e busca), `components/LogoMarca.js` (falha ao carregar a logo), `screens/Modelos.js` (busca), `screens/Preco.js` (ano escolhido) e `hooks/useCarregar.js` (dados, carregando e erro).
- useEffect: `hooks/useCarregar.js`, com array de dependências e função de limpeza (`AbortController` cancela a requisição ao sair da tela ou mudar o filtro). O hook é usado pelas três telas.
- Navegação com parâmetros: `App.js` declara o `NavigationContainer` e o Stack. Marcas navega para Modelos com `{ tipo, marca }`, e Modelos navega para Preço com `{ tipo, marca, modelo }`. As telas leem os dados com `route.params`, e o título da tela Modelos é dinâmico (`options` em `App.js`).
- Chamadas à API: `services/api.js` (`axios.create` com `baseURL` e cache em memória).

## Vídeo de demonstração

`demo/demo.mp4`

## Como executar

```
npm install
npx expo start
```

Depois, escaneie o QR code com o app Expo Go no celular (o celular e o computador devem estar na mesma rede Wi-Fi).
