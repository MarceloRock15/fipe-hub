import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fipe.parallelum.com.br/api/v2',
  timeout: 15000,
});

const cache = new Map();

export const foiCancelado = axios.isCancel;

const buscar = async (caminho, signal) => {
  if (cache.has(caminho)) {
    return cache.get(caminho);
  }
  const resposta = await api.get(caminho, { signal });
  cache.set(caminho, resposta.data);
  return resposta.data;
};

export const buscarMarcas = (tipo, signal) => buscar(`/${tipo}/brands`, signal);

export const buscarModelos = (tipo, marca, signal) =>
  buscar(`/${tipo}/brands/${marca}/models`, signal);

export const buscarAnos = (tipo, marca, modelo, signal) =>
  buscar(`/${tipo}/brands/${marca}/models/${modelo}/years`, signal);

export const buscarPreco = (tipo, marca, modelo, ano, signal) =>
  buscar(`/${tipo}/brands/${marca}/models/${modelo}/years/${ano}`, signal);
