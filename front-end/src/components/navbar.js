import React from 'react';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-3 me-0" href="#">Gestão de eleições</a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Votação</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Eleitores</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Candidatos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Partidos</a>
            </li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <button class="btn btn-primary">Relatório</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
