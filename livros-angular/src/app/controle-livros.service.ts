import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseUrl = "http://localhost:3030/livros";

interface LivroMongo{
  _id: string,
  codEditora: number,
  titulo: string,
  resumo: string,
  autores: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  

  constructor() { }

  async obterLivros() {
    try {
      const response = await fetch(baseUrl, { method: 'GET' });
      const data: LivroMongo[] = await response.json();
      return data.map(item => new Livro(item._id, item.codEditora, item.titulo, item.resumo, item.autores))
    }catch (error) {
      console.error("Erro ao obter livros:", error);
      return [];
    }
  }

  async incluir(livro: Livro) {
    const livroMongo: LivroMongo = {
      _id: '',
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
      const response = await fetch(`${baseUrl}/${codigo}`, {
        method: 'DELETE'
      });

      return response.ok;
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      return false;
    }
  }
}
