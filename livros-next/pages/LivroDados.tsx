import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '@/componentes/Menu';
import styles from '../styles/Home.module.css';
import ControleEditora from '../classes/control/ControleEditora';
import Livro from '@/classes/model/Livro';
import ControleLivro from '../classes/control/ControleLivros';

const controleLivros = new ControleLivro(); // Instanciando o controle de livros

const LivroDados = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(1);
  const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
  const router = useRouter();
  const controleEditora = new ControleEditora();
  const editoras = controleEditora.getEditoras();

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setCodEditora(value);
  };

  const incluir = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const novoLivro = new Livro(
      '',
      codEditora,
      titulo,
      resumo,
      autores.split('\n')
    );
    controleLivros.incluir(novoLivro).then(() => {
      router.push('/LivroLista');
    }).catch((error) => {
      console.error("Erro ao incluir livro:", error);
    });
  };

  useEffect(() => {
    const options = editoras.map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(options);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>LivroDados</title>
      </Head>
  
      <Menu />
  
      <main>
        <h1 className="text-center mt-4">Cadastrar Livro</h1>
  
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">
              Resumo:
            </label>
            <textarea
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">
              Autores:
            </label>
            <textarea
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">
              Editora:
            </label>
            <select
              id="editora"
              value={codEditora}
              onChange={tratarCombo}
              className="form-select"
            >
              {opcoes.map((option) => (
                <option key={option.value} value={option.value}>{option.text}</option>
              ))}
            </select>
          </div>
  
          <button type="submit" className="btn btn-primary">Enviar</button>

        </form>
      </main>
    </div>
  );
};

export default LivroDados;
