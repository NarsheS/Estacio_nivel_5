import React, { useState, useEffect, useMemo } from "react";
import ControleLivro from "./control/ControleLivros.ts";
import ControleEditora from "./control/ControleEditora.ts";

const LinhaLivro = ({ livro, excluir, controleEditora, index }) => {
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <th scope="row">
        <div className="flex flex-column">
          <div>{livro.titulo}</div>
          <button
            className="btn btn-danger"
            onClick={() => excluir(livro.codigo)}
          >
            Excluir
          </button>
        </div>
      </th>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const controleLivro = useMemo(() => new ControleLivro(), []); 
  const controleEditora = useMemo(() => new ControleEditora(), []); 

  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      controleLivro.obterLivros().then((livrosCarregados) => {
        setLivros(livrosCarregados);
        setCarregado(true);
      });
    }
  }, [carregado, controleLivro]);

  const excluirLivro = (codigoLivro) => {
    controleLivro.excluir(codigoLivro).then(() => {
      setCarregado(false);
    });
  };

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center my-3">Lista de Livros</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Resumo</th>
                <th scope="col">Editora</th>
                <th scope="col">Autores</th>
              </tr>
            </thead>
            <tbody className="my-5">
              {livros.map((livro) => (
                <LinhaLivro
                  key={livro.codigo}
                  livro={livro}
                  excluir={excluirLivro}
                  controleEditora={controleEditora}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default LivroLista;
