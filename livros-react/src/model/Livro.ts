import Editora from "./Editora.ts";

export default class Livro extends Editora {
  codigo: string;
  titulo: string;
  resumo: string;
  autores: string[];

  constructor(codigo: string, codEditora: number, titulo: string, resumo: string, autores: string[]){
    super(codEditora, "")
    this.codigo = codigo;
    this.titulo = titulo;
    this.resumo = resumo;
    this.autores = autores;
  }
}