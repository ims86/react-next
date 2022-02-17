import { useEffect, useState } from 'react';
import Questionario from '../components/Questionario';
import QuestaoModel from '../model/questao';
import { useRouter } from 'next/router';

const BASE_URL = 'http://localhost:3000/api';

export default function Home() {
  const router = useRouter();

  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respCertas, setRespCertas] = useState<number>(0);

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const idsQuestoes = await resp.json();
    setIdsQuestoes(idsQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resp.json();
    const novaQuestao = QuestaoModel.fromObject(json);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    carregarIdsQuestoes();
  }, []);

  useEffect(() => {
    idsQuestoes.length > 0 && carregarQuestao(idsQuestoes[0]);
  }, [idsQuestoes]);

  function questaoResp(questaoResp: QuestaoModel) {
    setQuestao(questaoResp);
    const acertou = questaoResp.acertou;
    setRespCertas(respCertas + (acertou ? 1 : 0));
  }

  function proximaPergunta() {
    const proximoIndice = idsQuestoes.indexOf(questao.id) + 1;
    return idsQuestoes[proximoIndice];
  }

  function proximoPasso() {
    const proximoId = proximaPergunta();
    proximoId ? proximaQuestao(proximoId) : finalizar();
  }

  function proximaQuestao(proximoId: number) {
    carregarQuestao(proximoId);
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: {
        total: idsQuestoes.length,
        certas: respCertas,
      },
    });
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={proximaPergunta() === undefined}
      questaoResp={questaoResp}
      proximoPasso={proximoPasso}
    />
  ) : (
    false
  );
}
