import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <Link class="navbar-brand col-lg-3 me-0" to="/">Gestão de eleições</Link>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
             <Link class="nav-link" to="/">Votação</Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/eleitor">Eleitor</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/candidato">Candidato</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/partido">Partido</Link>
            </li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <Link to="/relatorio"><button  type="button" class="btn btn-primary">Relatório</button></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
