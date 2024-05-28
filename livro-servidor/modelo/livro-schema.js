const banco = require('./conexao');

const LivroSchema = new banco.Schema({
  _id: {type: banco.Schema.Types.ObjectId, required: false},
  titulo: {type: String, required: true},
  codEditora: {type: Number, required: false},
  resumo: {type: String, required: false},
  autores: {type: Array, required: false}
});

const Livro = banco.model('Livro', LivroSchema);

module.exports = Livro;