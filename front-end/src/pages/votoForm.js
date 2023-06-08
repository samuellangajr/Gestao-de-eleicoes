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
  const [eleitorId, setEleitorId] = useState('');
  const [fotoEleitor, setFotoEleitor] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [candidatoId, setCandidatoId] = useState('');

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

  const handlePartySelection = (partyName, partID) => {
    if (selectedParty === partyName) {
      setSelectedParty('');
      setPartidoId('');
    } else {
      setSelectedParty(partyName);
      setPartidoId(partID);
    }
  };
  
  const handleCandidateSelection = (candidateName, candidateID) => {
    if (selectedCandidate === candidateName) {
      setSelectedCandidate('');
      setCandidatoId('');
    } else {
      setSelectedCandidate(candidateName);
      setCandidatoId(candidateID);
    }
  };
  

  const handleVotar = (e) => {
    e.preventDefault();
    console.log(`Partido escolhido: ${selectedParty}`);
    console.log(`Candidato escolhido: ${selectedCandidate}`);

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
        if (data._id) {
          setNomeEleitor(data.nome);
          setFotoEleitor(data.foto);
          setEleitorId(data._id); // Set the eleitorId to the retrieved ID
        } else {
          setNomeEleitor('');
          setEleitorId(''); // Reset the eleitorId if no ID is found
        }
      })
      .catch(error => {
        console.error('Erro ao buscar o eleitor:', error);
      });
  };

  return (
    <div className="container my-5">
      <div className="card" style={{ width: '200px', margin: '0 auto' }}>
        <Gravatar email={fotoEleitor || 'default@example.com'} name={nomeEleitor} size={200} />
        <div className="container text-center p-2">
          <h6>
            <b>{nomeEleitor || 'Nome do eleitor'}</b>
          </h6>
        </div>
      </div>
      <form>
        <div className="form-group my-3">
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
          <div className="container my-3">
            <div className="row">
              {parties.map((party, index) => (
                <div className="col-md-3 my-2" key={index}>
                  <div className={`card custom-card  ${selectedParty === party.nome ? 'selected' : ''}`} onClick={() => handlePartySelection(party.nome, party._id)}>
                    <Gravatar email={party.foto} size={200} />
                    <div className="card-body">
                      <h5 className="card-title">{party.nome}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label><b>Candidatos</b></label>
          <div className="container my-3">
            <div className="row">
              {candidates.map((candidate, index) => (
                <div className="col-md-3 my-2" key={index}>
                  <div className={`card custom-card ${selectedCandidate === candidate.nome ? 'selected' : ''}`} onClick={() => handleCandidateSelection(candidate.nome, candidate._id)}>
                    <Gravatar email={candidate.foto} size={200} />
                    <div className="card-body">
                      <h5 className="card-title">{candidate.nome}</h5>
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
