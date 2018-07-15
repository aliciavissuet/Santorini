import React, { Component } from "react";
import Squares from './squares.js';


export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      layerCount: 0,
      isSelected: false,
    };
  }

  render(){
    return (

      <div>
      <Squares
          />
      </div>

    );
  }
}

//square is created in child-squares. when square is clicked on it
//it is passed to parent and given attributes. these attributes are then passed
//back to the child so that they can render the square/board with appropriate values
