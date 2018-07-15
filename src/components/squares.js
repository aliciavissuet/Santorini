import React, { Component } from "react";
import '../style/squares.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={{backgroundColor:props.backgroundColor}}>
      {props.value}
    </button>
  );
}

export default class Squares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill("X", 12, 13),
      bgColor: Array(25).fill('white'),
      selected: Array(25).fill(false),
      currentlocation: Array(25).fill(true, 12, 13)

    };
  }
handleClick(i) {
    // var squares = Array(25).fill(null);
    // var bgColor = Array(25).fill('white');
    //
    //
    //
    // bgColor[i] = "red";
    // squares[i] = 'X';
    // selected[i]= true
    //
    // this.setState({squares: squares, selected});
    //
    //

    if (this.state.selected[i]) {
      // CASE 1: IF CLICK ON RED SPACE
      this.setState({bgColor:Array(25).fill('white'),selected: Array(25).fill(false)})
    } else if (this.state.selected.indexOf(true)>-1
    && this.state.currentlocation.indexOf(true) ===
    (i || i+1 || i-1 || i+5 || i-5)) {
      // CASE 2 : IF CLICK ON ANY SQUARE WHILE X IS SELECTED
      const bgColor = Array(25).fill('white');
      const selected = Array(25).fill(false)
      const squares = Array(25).fill("X", i, i+1)
      const currentlocation = Array(25).fill(true, i, i+1)

      this.setState({squares,bgColor,selected})
    } else if (this.state.squares[i] === "X") {
      // CASE 3 : IF CLICK ON NOT SELECTED SQUARE WITH X
      this.setState({bgColor:Array(25).fill('red', i, i+1)})
      this.setState({selected:Array(25).fill(true,i,i+1)})
      this.setState({currentlocation:Array(25).fill(true, i, i+1)});
    }
}

renderSquare(i) {
  return (
    <Square value={this.state.squares[i]}
  backgroundColor={this.state.bgColor[i]}
  onClick={() => this.handleClick(i)} />

);
}


render(){
  return (
    <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
        {this.renderSquare(20)}
        {this.renderSquare(21)}
        {this.renderSquare(22)}
        {this.renderSquare(23)}
        {this.renderSquare(24)}
        </div>

      </div>
    );
  }
}
