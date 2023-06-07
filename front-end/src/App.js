import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import VotoForm from './pages/votoForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <VotoForm />
        <Footer />
      </header>
    </div>
  );
}

export default App;
