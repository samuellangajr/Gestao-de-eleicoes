import React from 'react';

const CandidatoForm = () => {
  return (
    <div className="container my-5">
    <form>
    <div className="form-group">
        <label>Nome</label>
        <input type="text" className="form-control" id="nome" />
    </div>
    <div className="form-group">
        <label>Partido</label>
        <input type="text" className="form-control" id="partido" />
    </div>
    <div className="form-group">
        <label>Foto</label>
        <input type="file" className="form-control" id="foto" />
    </div>
    <button type="submit" className="btn btn-primary my-2">Submeter</button>
    </form>
</div>
    );
};

export default CandidatoForm;
