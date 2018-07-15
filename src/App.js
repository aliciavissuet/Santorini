import React, { Component } from 'react';
import './App.css';
import Board from './components/board.js'

class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">
        <h1>Santorini</h1>
        <h2>Build like a mortal, win like a God</h2>
        </header>
        <Board />
      </div>

    );
  }
}


export default App;
