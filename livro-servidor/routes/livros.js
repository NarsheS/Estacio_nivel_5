const express = require('express');
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const livros = await obterLivros();
    res.json(livros);
  } catch(err){
    res.status(500).json({ error: "Erro ao obter livros" });
  }
});

router.post('/', async (req, res) => {
  const { titulo, codEditora, resumo, autores } = req.body;

  try {
    const novoLivro = await incluir({ titulo, codEditora, resumo, autores });
    res.status(201).json({ message: "Livro incluído com sucesso", livro: novoLivro});
  } catch(err){
    res.status(500).json({ error: "Erro ao incluir livro" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await excluir(req.params.id);
    if(resultado.deletedCount === 1){
      res.status(200).json({ message: "Livro excluído com sucesso "});
    } else {
      res.status(404).json({ message: "Livro não encontrado "});
    }
  } catch(err){
    res.status(500).json({ error: "Erro ao excluir o livro" });
  }
});

module.exports = router;