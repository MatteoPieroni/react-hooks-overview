import React from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { User } from './components/User';

import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <User />
      </div>
      <Footer />
    </div>
  );
}

export default App;
