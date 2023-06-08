import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import VotoForm from './pages/votoForm';
import EleitorForm from './pages/eleitorForm';
import CandidatoForm from './pages/candidatoForm';
import PartidoForm from './pages/partidoForm';
import RelatorioPage from './pages/relatorioPage';

function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={< VotoForm/>} />
          <Route path="/eleitor" element={< EleitorForm/>} />
          <Route path="/candidato" element={< CandidatoForm/>} />
          <Route path="/partido" element={< PartidoForm/>} />
          <Route path="/relatorio" element={< RelatorioPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
