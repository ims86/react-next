import { embaralhar } from '../../../functions/arrays';
import questoes from '../baseQuestoes';

export default function questionario(req, res) {
  const ids = questoes.map((questao) => questao.id);
  res.status(200).json(embaralhar(ids));
}
