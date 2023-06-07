import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import VotoForm from './pages/votoForm';
import EleitorForm from './pages/eleitorForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <EleitorForm />
        <Footer />
      </header>
    </div>
  );
}

export default App;
