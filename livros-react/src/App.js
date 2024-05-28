// App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LivroLista from "./LivroLista";
import LivroDados from "./LivroDados";

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Catálogo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/novo">
                  Novo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<LivroLista />} />
        <Route path="/novo" element={<LivroDados />} />
      </Routes>
    </Router>
  );
};

export default App;
