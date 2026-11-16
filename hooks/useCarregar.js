import { useEffect, useState } from 'react';
import { foiCancelado } from '../services/api';

export default function useCarregar(buscarDados, dependencias) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controle = new AbortController();

    const carregar = async () => {
      setCarregando(true);
      setErro(false);
      try {
        const resultado = await buscarDados(controle.signal);
        setDados(resultado);
      } catch (falha) {
        if (!foiCancelado(falha)) {
          setErro(true);
        }
      } finally {
        if (!controle.signal.aborted) {
          setCarregando(false);
        }
      }
    };

    carregar();

    return () => controle.abort();
  }, [...dependencias, tentativa]);

  const tentarNovamente = () => setTentativa((valor) => valor + 1);

  return { dados, carregando, erro, tentarNovamente };
}
