import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Editora } from '../editora';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  public editoras: Editora[] = [];
  public livros: Livro[] = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) {}

  async ngOnInit(): Promise<void> {
    this.editoras = this.servEditora.getEditoras();
    this.livros = await this.servLivros.obterLivros();
  }

  excluir = (codigo: string): void => {
    this.servLivros.excluir(codigo).then(() => {
      this.servLivros.obterLivros().then((livros) => {
        this.livros = livros;
      })
    })
  }

  obterNome = (codEditora: number): string => {
    console.log('Getting name for codEditora:', codEditora);
    const nomeEditora = this.servEditora.getNomeEditora(codEditora);
    console.log('Found name:', nomeEditora);
    return nomeEditora;
  }
  
}
