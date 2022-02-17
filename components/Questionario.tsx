import styles from '../styles/Questionario.module.css';
import Questao from './Questao';
import Botao from './Botao';
import QuestaoModel from '../model/questao';

interface QuestionarioProps {
  questao: QuestaoModel;
  ultima: boolean;
  questaoResp: (questao: QuestaoModel) => void;
  proximoPasso: () => void;
}

export default function Questionario(props: QuestionarioProps) {
  function respUser(indice: number) {
    if (props.questao.naoRespondida) {
      props.questaoResp(props.questao.responderCom(indice));
    }
  }

  return (
    <div className={styles.questionario}>
      {props.questao ? (
        <Questao
          valor={props.questao}
          tempoPraResposta={6}
          respUser={respUser}
          timeOut={props.proximoPasso}
        />
      ) : (
        false
      )}

      <Botao
        onClick={props.proximoPasso}
        texto={props.ultima ? 'Finalizar' : 'Próxima'}
      />
    </div>
  );
}
