import ControleLivro from "@/classes/control/ControleLivros";
import { NextApiRequest, NextApiResponse } from "next";

export const controleLivro = new ControleLivro();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      const novoLivro = req.body;
      controleLivro.incluir(novoLivro);
      res.status(200).json({ message: 'Livro adicionado com sucesso.' });
    } else if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo);
      if (!codigo || isNaN(codigo)) {
        res.status(400).json({ error: 'Código inválido.' });
        return;
      }
      controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
  }
}

export default handler;
