import React from 'react';

const VotoForm = () => {
  return (
    <div className="container my-5">
        <form>
        <div className="form-group">
            <label>Número de BI</label>
            <input type="text" className="form-control" id="bi" />
        </div>
        <div className="form-group">
            <label>Partido</label>

        </div>
        <div className="form-group">
         <label>Candidato</label>

        </div>
        <button type="submit" className="btn btn-primary">Submeter</button>
        </form>
    </div>
  );
};

export default VotoForm;
