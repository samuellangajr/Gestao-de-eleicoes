import React, { useState, useEffect } from 'react';

const CandidatoForm = () => {

  //Estadis
  const [nome, setNome] = useState('');
  const [partido, setPartido] = useState('');
  const [foto, setFoto] = useState('');
  const [partidos, setPartidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Obter a lista de partidos da base de dados
    fetch('http://localhost:5000/api/partidos')
      .then((response) => response.json())
      .then((data) => setPartidos(data))
      .catch((error) => console.error('Erro de conexão:', error));
  }, []);


  //Efectuar registro
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      partido: partido,
      foto: foto,
    };
    
    try {
      //fetch para regitrar o candidato
      const response = await fetch('http://localhost:5000/api/candidatos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setNome('');
        setPartido('');
        setFoto('');

        showModalMessage('Candidato criado com sucesso');
      } else {
        showModalMessage('Erro ao criar candidato');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const hideModalMessage = () => {
    setShowModal(false);
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Partido</label>
          <select
            className="form-control"
            value={partido}
            onChange={(event) => setPartido(event.target.value)}
          >
            <option value="">Selecione um partido</option>
            {partidos.map((partido) => (
              <option key={partido._id} value={partido._id}>
                {partido.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Foto</label>
          <input
            type="text"
            className="form-control"
            value={foto}
            onChange={(event) => setFoto(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submeter
        </button>
      </form>

      {/* Modal de mensagem */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mensagem</h5>
              <button type="button" className="close" onClick={hideModalMessage}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{modalMessage}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hideModalMessage}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatoForm;
