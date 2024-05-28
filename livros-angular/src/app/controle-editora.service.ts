import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  editoras: Editora[] = [
    { codEditora: 1, nome: 'Alta Books' },
    { codEditora: 2, nome: 'Pearson' },
    { codEditora: 3, nome: 'Alcatrão Livros' }
  ];

  constructor() { }

  getNomeEditora(codEditora: number): string {
    const editora = this.editoras.find((e) => e.codEditora === codEditora);
    return editora ? editora.nome : 'Editora não encontrada';
  }

  getEditoras(): Editora[] {
    return this.editoras;
  }
}
