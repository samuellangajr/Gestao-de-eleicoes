import React from 'react';

const RelatorioModal = () => {
    return (
        <div className="container my-5">
            <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Partido</th>
      <th scope="col">Numero de votos</th>
      <th scope="col">Percentagem</th>
      <th scope="col">Classificação</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-success">
      <th scope="row">Frelimo</th>
      <td>3000</td>
      <td>50%</td>
      <td>Vencedor</td>
    </tr>
    <tr class="table-warning">
      <th scope="row">Renamo</th>
      <td>2000</td>
      <td>35%</td>
      <td>Segundo lugar</td>
    </tr>
    <tr class="table-danger">
      <th scope="row">MDM</th>
      <td>1000</td>
      <td>15%</td>
      <td>Terceiro lugar</td>
    </tr>
  </tbody>
</table>
        </div>
    );
};

export default RelatorioModal;
