import ControleEditora from '@/classes/control/ControleEditora';
import Livro from '@/classes/model/Livro';
import React from 'react';

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const controleEditora = new ControleEditora();
  let editora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td className="fw-bold">{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{editora}</td>
      <td>
        <ul className="list-unstyled">
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td>
        <button className="btn btn-danger" onClick={excluir}>
          Excluir
        </button>
      </td>
    </tr>
  );  
};

export default LinhaLivro;
