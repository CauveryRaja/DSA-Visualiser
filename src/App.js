import React from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './components/Dashboard/dashboard';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import CanvasRenderer from './components/Canvas Renderer/canvasRenderer';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {

  return (
    <div className="App">
      <Header></Header>
      {/* <Dashboard></Dashboard> */}
      <CanvasRenderer></CanvasRenderer>
      <Footer></Footer>
    </div>
  );
}

export default App;
