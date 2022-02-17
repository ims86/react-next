import styles from '../styles/Questao.module.css';
import QuestaoModel from '../model/questao';
import Enunciado from './Enunciado';
import Temporizador from './Temporizador';
import Resposta from './Resposta';

const letras = [
  { valor: 'A', cor: '#F2C866' },
  { valor: 'B', cor: '#F266BA' },
  { valor: 'C', cor: '#85D4F2' },
  { valor: 'D', cor: '#BCE596' },
];

interface QuestaoProps {
  valor: QuestaoModel;
  tempoPraResposta?: number;
  respUser: (indice: number) => void;
  timeOut: () => void;
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderRespostas() {
    return questao.respostas.map((resposta, i) => {
      return (
        <Resposta
          key={`${questao.id}-${i}`}
          valor={resposta}
          indice={i}
          letra={letras[i].valor}
          corFundoLetra={letras[i].cor}
          respUser={props.respUser}
        />
      );
    });
  }

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador
        key={questao.id}
        duracao={props.tempoPraResposta ?? 10}
        timeOut={props.timeOut}
      />
      {renderRespostas()}
    </div>
  );
}
