import React from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './components/Dashboard/dashboard';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Dashboard></Dashboard>
      <Footer></Footer>
    </div>
  );
}

export default App;
