import React, { Component } from 'react';
import './App.css';
import Board from './components/board.js'
import header2 from './header2.png'

class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">

        <h2>Santorini <img className="header-img" src={header2} height={"60"}/></h2>
        </header>
        <Board />
      </div>

    );
  }
}


export default App;
