import React, { useState } from 'react';

const EleitorForm = () => {
  const [nome, setNome] = useState('');
  const [numeroBI, setNumeroBI] = useState('');
  const [foto, setFoto] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      bi: numeroBI,
      foto: foto,
    };

    try {
      const response = await fetch('http://localhost:5000/api/eleitores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setNome('');
        setNumeroBI('');
        setFoto('');

        showModalMessage('Eleitor criado com sucesso');
      } else {
        showModalMessage('Erro ao criar eleitor');
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
          <label>Número de BI</label>
          <input
            type="text"
            className="form-control"
            value={numeroBI}
            onChange={(event) => setNumeroBI(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Foto</label>
          <input
            type="text"
            className="form-control"
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

export default EleitorForm;
