import Livro from "../model/Livro";
import ControleEditora from "./ControleEditora";

const baseUrl = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null,
  codEditora: number,
  titulo: string,
  resumo: string,
  autores: string[]
}

export default class ControleLivro {
  controleEditora: ControleEditora;

  constructor() {
    this.controleEditora = new ControleEditora();
  }

  async obterLivros(){
    try {
      const response = await fetch(baseUrl, { method: "GET" });
      if (!response.ok) {
        throw new Error("Erro ao obter livros");
      }
      const livrosMongo: LivroMongo[] = await response.json();

      // Mapear o codEditora para o nome da editora
      const livros = livrosMongo.map(item => {
        const nomeEditora = this.controleEditora.getNomeEditora(item.codEditora) || "Desconhecida";
        return new Livro(item._id, nomeEditora, item.titulo, item.resumo, item.autores);
      });

      return livros;
    } catch (error) {
      console.error("Erro ao obter livros:", error);
      return [];
    }
  }

  async incluir(livro: Livro) {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(livroMongo)
      });

      return response.ok;
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
      return false;
    }
  }

  async excluir(codigo: string) {
    try {
      console.log(`Tentando excluir livro com código: ${codigo}`);
      
      const response = await fetch(`${baseUrl}/${codigo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro ao excluir livro: ${response.status} - ${response.statusText} - ${errorText}`);
        return false;
      }
  
      console.log(`Livro com código ${codigo} excluído com sucesso.`);
      return true;
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      return false;
    }
  }
  
  
}
