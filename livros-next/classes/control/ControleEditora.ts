import Editora from "../model/Editora";

const editoras: Array<Editora> = [
  new Editora(1, "Pearson"),
  new Editora(2, "Alcatrão Livros"),
  new Editora(3, "Hussum")
];

export default class ControleEditora {
  getNomeEditora(codEditora: number) {
    let editoraEncontrada = editoras.find(editora => editora.codEditora === codEditora);
    return editoraEncontrada ? editoraEncontrada.nome : undefined;
  }

  getEditoras() {
    return editoras;
  }
}

