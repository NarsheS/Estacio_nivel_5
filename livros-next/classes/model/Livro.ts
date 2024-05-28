export default class Livro {
  codigo: string;
  codEditora: string;
  titulo: string;
  resumo: string;
  autores: string[];

  constructor(codigo: string, codEditora: string, titulo: string, resumo: string, autores: string[]){
    this.codigo = codigo;
    this.codEditora = codEditora;
    this.titulo = titulo;
    this.resumo = resumo;
    this.autores = autores;
  }
}
