import React, { Component } from "react";
import Squares from './squares.js';
import header2 from '../header2.png';

export default class Board extends Component {

  render(){
    return (

      <div className ="Santorini" >
          <header className="App-header">

              <h2>Santorini <img className="header-img" src={header2} height={"60"}/></h2>
          </header>

      <Squares
          />
      </div>

    );
  }
}

//square is created in child-squares. when square is clicked on it
//it is passed to parent and given attributes. these attributes are then passed
//back to the child so that they can render the square/board with appropriate values
