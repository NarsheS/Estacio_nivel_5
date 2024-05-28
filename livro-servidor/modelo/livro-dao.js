const Livro = require("./livro-schema");

const obterLivros = async () => {
  try {
    const livros = await Livro.find();
    console.log('Livros obtidos:', livros);
    return livros;
  } catch (err) {
    console.error('Erro ao obter os livros:', err);
    throw err;
  }
};

const incluir = async ({ titulo, codEditora, resumo, autores }) => {
  try {
    const novoLivro = await Livro.create({_id: null, titulo, codEditora, resumo, autores });
    console.log('Livro incluído com sucesso:', novoLivro);
    return novoLivro;
  } catch (err) {
    console.error('Erro ao incluir o livro:', err);
    throw err;
  }
};

const excluir = async (codigo) => {
  try {
    const resultado = await Livro.deleteOne({ _id: codigo });
    console.log('Resultado da exclusão:', resultado);
    return resultado;
  } catch (err) {
    console.error('Erro ao excluir o livro:', err);
    throw err;
  }
};

module.exports = { obterLivros, incluir, excluir }