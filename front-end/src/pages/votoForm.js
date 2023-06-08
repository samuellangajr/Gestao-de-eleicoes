import React from 'react';
import avatarImage from '../assets/images/eleitores/avatar.png';
import frelimoImage from '../assets/images/partidos/frelimo.png';
import renamoImage from '../assets/images/partidos/renamo.jpeg';
import mdmImage from '../assets/images/partidos/mdm.jpeg';
import podemosImage from '../assets/images/partidos/podemos.jpeg';

const VotoForm = () => {
  return (
    <div className="container my-5">
      <div className="card" style={{ width: '200px', margin: '0 auto' }}>
        <img src={avatarImage} alt="avatar" style={{ width: '100%' }} />
        <div className="container text-center">
          <h6>
            <b>Nome do Eleitor</b>
          </h6>
        </div>
      </div>
      <form>
        <div className="form-group">
          <label><b>Número de BI</b></label>
          <input type="text" className="form-control" id="bi" />
        </div>
        <div className="form-group">
          <label><b>Partidos</b></label>
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={podemosImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Podemos</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={renamoImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Renamo</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={mdmImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">MDM</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={frelimoImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Frelimo</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label><b>Candidatos</b></label>
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={podemosImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Podemos</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={renamoImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Renamo</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={mdmImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">MDM</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card custom-card">
                  <img className="card-img-top" src={frelimoImage} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Frelimo</h5>
                    <a href="#" className="btn btn-primary">Votar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <p><b>Partido escolhido:</b> </p>
          <p><b>Candidato escolhido:</b> </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submeter
        </button>
      </form>
    </div>
  );
};

export default VotoForm;
