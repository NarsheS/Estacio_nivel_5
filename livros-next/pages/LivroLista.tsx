import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Menu } from "@/componentes/Menu";
import ControleLivro from "@/classes/control/ControleLivros";
import Livro from "@/classes/model/Livro";

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const controleLivros = new ControleLivro();

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const livrosObtidos = await controleLivros.obterLivros();
        setLivros(livrosObtidos);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      }
    };
    carregarLivros();
  }, []);

  const excluirLivro = async (codigo: string) => {
    try {
      const sucesso = await controleLivros.excluir(codigo);
      if (sucesso) {
        setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
      } else {
        console.error("Falha ao excluir o livro");
      }
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
    }
  };

  return (
    <main className={styles.container}>
      <Menu />
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
                <th style={{ width: "100px" }} scope="col">
                  Título
                </th>
                <th style={{ width: "200px" }} scope="col">
                  Resumo
                </th>
                <th style={{ width: "150px" }} scope="col">
                  Editora
                </th>
                <th style={{ width: "150px" }} scope="col">
                  Autores
                </th>
                <th style={{ width: "100px" }} scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="my-5">
              {livros.map((livro) => (
                <tr key={livro.codigo}>
                  <td>{livro.titulo}</td>
                  <td>{livro.resumo}</td>
                  <td>{livro.codEditora}</td>
                  <td>{livro.autores.join(", ")}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => excluirLivro(livro.codigo)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default LivroLista;
