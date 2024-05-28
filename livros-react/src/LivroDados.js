import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ControleLivro from "./control/ControleLivros.ts";
import ControleEditora from "./control/ControleEditora.ts";

const LivroDados = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(0);

  const controleEditora = new ControleEditora();
  const controleLivro = new ControleLivro();

  let opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const tratarCombo = (event) => {
    const value = parseInt(event.target.value);
    setCodEditora(value);
  };

  const incluir = (event) => {
    event.preventDefault();
    const autoresArray = autores.split("\n").map((item) => item.trim());
    const novoLivro = {
      codigo: "",
      titulo: titulo,
      resumo: resumo,
      autores: autoresArray,
      codEditora: codEditora,
    };
    controleLivro.incluir(novoLivro).then(() => {
      navigate("/");
    });
  };

  return (
    <main class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h1 class="text-center mt-4">Dados do Livro</h1>
          <form onSubmit={incluir}>
            <div class="mb-3">
              <label for="titulo" class="form-label">
                Título:
              </label>
              <input
                id="titulo"
                class="form-control"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="resumo" class="form-label">
                Resumo:
              </label>
              <textarea
                id="resumo"
                class="form-control"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="autores" class="form-label">
                Autores:
              </label>
              <textarea
                id="autores"
                class="form-control"
                value={autores}
                onChange={(e) => setAutores(e.target.value)}
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="editora" class="form-label">
                Editora:
              </label>
              <select
                id="editora"
                class="form-select"
                value={codEditora}
                onChange={tratarCombo}
              >
                {opcoes.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.text}
                  </option>
                ))}
              </select>
            </div>
            <div class="text-center">
              <button class="btn btn-primary" type="submit">
                Salvar Dados
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LivroDados;
