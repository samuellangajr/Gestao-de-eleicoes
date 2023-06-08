import React, { useEffect, useState } from 'react';
import Gravatar from 'react-gravatar';

const VotoForm = () => {
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [bi, setBi] = useState('');
  const [nomeEleitor, setNomeEleitor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Fetch parties from the backend
    fetch('http://localhost:5000/api/partidos/')
      .then(response => response.json())
      .then(data => setParties(data));

    // Fetch candidates from the backend
    fetch('http://localhost:5000/api/candidatos/')
      .then(response => response.json())
      .then(data => setCandidates(data));
  }, []);

  const handlePartySelection = (partyName) => {
    setSelectedParty(partyName);
  };

  const handleCandidateSelection = (candidateName) => {
    setSelectedCandidate(candidateName);
  };

  const handleVotar = (e) => {
    e.preventDefault();
    console.log(`Partido escolhido: ${selectedParty}`);
    console.log(`Candidato escolhido: ${selectedCandidate}`);
    
    // Register the vote
    const eleitorId = bi; // Use the entered BI as the eleitorId
    const partidoId = selectedParty; // Use the selected party ID
    const candidatoId = selectedCandidate; // Use the selected candidate ID

    fetch('http://localhost:5000/api/votar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eleitorId, partidoId, candidatoId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setModalMessage('Voto registrado com sucesso.');
        } else {
          setModalMessage('Erro ao registrar o voto.');
        }
        setShowModal(true);
      })
      .catch(error => {
        console.error('Erro ao registrar o voto:', error);
      });
  };

  const handleNomeEleitorChange = (e) => {
    const enteredBi = e.target.value;
    setBi(enteredBi);

    fetch(`http://localhost:5000/api/eleitores/${enteredBi}`)
      .then(response => response.json())
      .then(data => {
        if (data.nome) {
          setNomeEleitor(data.nome);
        } else {
          setNomeEleitor('');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar o eleitor:', error);
      });
  };

  return (
    <div className="container my-5">
      <div className="card" style={{ width: '200px', margin: '0 auto' }}>
        <Gravatar email="email@example.com" name={nomeEleitor} size={200}  />
        <div className="container text-center">
          <h6>
            <b>{nomeEleitor}</b>
          </h6>
        </div>
      </div>
      <form>
        <div className="form-group">
          <label><b>Número de BI</b></label>
          <input
            type="text"
            className="form-control"
            id="bi"
            value={bi}
            onChange={handleNomeEleitorChange}
          />
        </div>
        <div className="form-group">
          <label><b>Partidos</b></label>
          <div className="container my-5">
            <div className="row">
              {parties.map((party, index) => (
                <div className="col-md-3 my-2" key={index}>
                  <div className="card custom-card">
                    <Gravatar email={party.foto} size={200} />
                    <div className="card-body">
                      <h5 className="card-title">{party.nome}</h5>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handlePartySelection(party.nome)}
                      >
                        Votar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label><b>Candidatos</b></label>
          <div className="container my-5">
            <div className="row">
              {candidates.map((candidate, index) => (
                <div className="col-md-3 my-2" key={index}>
                  <div className="card custom-card">
                    <Gravatar email={candidate.foto} size={200} />
                    <div className="card-body">
                      <h5 className="card-title">{candidate.nome}</h5>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleCandidateSelection(candidate.nome)}
                      >
                        Votar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <p><b>Partido escolhido:</b> {selectedParty}</p>
          <p><b>Candidato escolhido:</b> {selectedCandidate}</p>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleVotar}>
          Submeter
        </button>
      </form>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mensagem</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modalMessage}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setShowModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotoForm;
