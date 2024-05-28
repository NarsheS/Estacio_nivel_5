import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'DELETE') {
      const { codigo } = req.query;
      if (!codigo || isNaN(Number(codigo))) {
        res.status(400).json({ error: 'Código inválido.' });
        return;
      }
      controleLivro.excluir(Number(codigo));
      res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
  }
}
