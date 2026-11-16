const BASE_LOGOS =
  'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb';

const APELIDOS = {
  'kia-motors': 'kia',
  'caoa-chery': 'chery',
  'caoa-chery-chery': 'chery',
  'caoa-changan': 'changan',
  gwm: 'great-wall',
};

const nomeSemPrefixo = (nomeMarca) => {
  const partes = nomeMarca.split(' - ');
  return partes[partes.length - 1].trim();
};

export const urlLogo = (nomeMarca) => {
  const slug = nomeSemPrefixo(nomeMarca)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  if (!slug) {
    return null;
  }
  return `${BASE_LOGOS}/${APELIDOS[slug] ?? slug}.png`;
};

export const iniciais = (nomeMarca) => {
  const palavras = nomeSemPrefixo(nomeMarca).split(/\s+/);
  if (palavras.length > 1) {
    return `${palavras[0].charAt(0)}${palavras[1].charAt(0)}`.toUpperCase();
  }
  const palavra = palavras[0];
  return (palavra.length <= 3 ? palavra : palavra.slice(0, 2)).toUpperCase();
};
