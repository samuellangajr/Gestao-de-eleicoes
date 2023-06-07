import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import VotoForm from './pages/votoForm';
import EleitoresForm from './pages/eleitoresForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <EleitoresForm />
        <Footer />
      </header>
    </div>
  );
}

export default App;
