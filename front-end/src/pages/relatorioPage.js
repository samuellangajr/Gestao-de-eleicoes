import React, { useEffect, useState } from 'react';

const RelatorioModal = () => {
  const [relatorio, setRelatorio] = useState(null);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/relatorio-votos');
        const data = await response.json();
        setRelatorio(data);
      } catch (error) {
        console.error('Error fetching relatorio:', error);
      }
    };

    fetchRelatorio();
  }, []);

  if (!relatorio) {
    return <div>Loading...</div>;
  }

return (
  <div className="container my-5">
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Partido</th>
          <th scope="col">Numero de votos</th>
          <th scope="col">Percentagem</th>
          <th scope="col">Classificação</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-success">
          <th scope="row">{relatorio.partidoVencedor.nome}</th>
          <td>{relatorio.partidoVencedor.votos}</td>
          <td>{relatorio.partidoVencedor.percentual}%</td>
          <td>Vencedor</td>
        </tr>
        {/* Render other partido rows */}
        {relatorio.outrosPartidos.map((partido, index) => (
          <tr key={partido.nome} className={index === 0 ? 'table-warning' : 'table-danger'}>
            <th scope="row">{partido.nome}</th>
            <td>{partido.votos}</td>
            <td>{partido.percentual}%</td>
            <td>{index === 0 ? 'Segundo lugar' : 'Terceiro lugar'}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="table mt-4">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Candidato</th>
          <th scope="col">Numero de votos</th>
          <th scope="col">Percentagem</th>
          <th scope="col">Classificação</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-success">
          <th scope="row">{relatorio.candidatoVencedor.nome}</th>
          <td>{relatorio.candidatoVencedor.votos}</td>
          <td>{relatorio.candidatoVencedor.percentual}%</td>
          <td>Vencedor</td>
        </tr>
        {/* Render other candidato rows */}
        {relatorio.outrosCandidatos.map((candidato, index) => (
          <tr key={candidato.nome} className={index === 0 ? 'table-warning' : 'table-danger'}>
            <th scope="row">{candidato.nome}</th>
            <td>{candidato.votos}</td>
            <td>{candidato.percentual}%</td>
            <td>{index === 0 ? 'Segundo lugar' : 'Terceiro lugar'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ...


};

export default RelatorioModal;
