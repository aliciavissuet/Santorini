import React, { Component } from "react";
import '../style/squares.css';

function Square(props) {

  return (
    <button className="square" onClick={props.onClick} style={{backgroundColor:props.backgroundColor}}>
      {props.value}{props.height}
    </button>
  );
}

export default class Squares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill("X", 12, 13).fill("X", 0, 1).fill("T", 1, 2).fill("T", 13, 14),
      bgColor: Array(25).fill('white'),
      selected: Array(25).fill(false),
      currentlocation: Array(25).fill(true, 12, 13),
      buildingheight: Array(25).fill(0),
      workerSelected: null,
      phase: "select worker",
      player1Turn: true


    };
  }
  handleClick(newClick) {

    if (this.state.phase === "select worker") {
      this.handleSelect(newClick)
    }
    if (this.state.phase === "move worker") {
      this.handleMove(newClick)
    }
    if (this.state.phase === "build layer") {
      this.handleBuild(newClick)
    }




}
  handleSelect(newClick){
    const i = newClick

    if ((this.state.squares[i] === "X" || this.state.squares[i] === "x") && this.state.player1Turn ||
    (this.state.squares[i] === "T" || this.state.squares[i] === "t") && !this.state.player1Turn) {
     // CASE 3 : IF CLICK ON NOT SELECTED SQUARE WITH X
     this.setState({bgColor:Array(25).fill('red', i, i+1)})
     this.setState({selected:Array(25).fill(true,i,i+1)})
     this.setState({currentlocation:Array(25).fill(true, i, i+1)})
     this.setState({phase:"move worker"});
    }

  }


  handleMove(newClick){
    const prevX = this.state.selected.indexOf(true)
    const only1 = this.state.squares

    function getAllIndexes(arr, val) {
      var indexes = [], i;

      for (i = 0; i < arr.length; i++)
          if (arr[i] === val)
              indexes.push(i);
      return indexes;
}

    function validClick(j,newClick, height) {
        const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
        const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
        const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
        const only1x = getAllIndexes(only1, "X")
        const only1t = getAllIndexes(only1, "T")
        let validClick_ = false;

        if (j % 5 === 0
        && currlocationcheckleft.indexOf(newClick)>-1
        && height[j]+1 >= height[newClick]
        && only1t.indexOf(newClick) <= -1
        && only1x.indexOf(newClick) <= -1){

          validClick_ = true

        } else if (j % 5 === 4
      && currlocationcheckright.indexOf(newClick)>-1
      && height[j]+1 >= height[newClick]
      && only1t.indexOf(newClick) <= -1
      && only1x.indexOf(newClick) <= -1) {

        validClick_ = true

      } else if (j %5 != 0 && j%5 != 4
        && currlocationcheckelse.indexOf(newClick)>-1
        && height[j]+1 >= height[newClick]
        && only1t.indexOf(newClick) <= -1
        && only1x.indexOf(newClick) <= -1) {

        validClick_ = true
      }
      return validClick_;
    }

    function whoseTurn(p) {
      let playernumber = ""
      if (p) {
        playernumber = "X";
      } else {
        playernumber = "T";
      }
      return playernumber;
    }

    const i = newClick;

    if (this.state.selected[i]) {
      // CASE 1: IF CLICK ON RED SPACE
      this.setState({bgColor:Array(25).fill('white'),selected: Array(25).fill(false), phase:"select worker"})
    } else if (this.state.selected.indexOf(true)>-1){
      // CASE 2 : IF CLICK ON ANY SQUARE WHILE X IS SELECTED

      if (validClick(this.state.currentlocation.indexOf(true),newClick, this.state.buildingheight)) {
        const bgColor = Array(25).fill('white');
        const squares = this.state.squares.fill(whoseTurn(this.state.player1Turn), i, i+1).fill(null, prevX, prevX+1)
        const selected = Array(25).fill(false)

        const currentlocation = Array(25).fill(true, i, i+1)

        this.setState({squares,bgColor,selected, phase:"build layer", currentlocation})
      }

    }
  }

  handleBuild(newClick){
    const only1 = this.state.squares
    function winthroughbuild(newBuildingHeight){
      let gameOver = false;
      if (newBuildingHeight === 4) {
      return true
      }
      return false
    }

    function getAllIndexes(arr, val) {
      var indexes = [], i;

      for (i = 0; i < arr.length; i++)
          if (arr[i] === val)
              indexes.push(i);
      return indexes;
    }

    function validClick(j,newClick) {
        const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
        const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
        const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
        const only1x = getAllIndexes(only1, "X")
        const only1t = getAllIndexes(only1, "T")

        let validClick_ = false;
        if (j % 5 === 0
        && currlocationcheckleft.indexOf(newClick)>-1
        && only1x.indexOf(newClick)<=-1
        && only1t.indexOf(newClick <=-1)){

          validClick_ = true
        } else if (j % 5 === 4
      && currlocationcheckright.indexOf(newClick)>-1
      && only1x.indexOf(newClick)<=-1
      && only1t.indexOf(newClick <=-1)){

        validClick_ = true
      } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1
      && only1x.indexOf(newClick)<=-1
      && only1t.indexOf(newClick <=-1)){

        validClick_ = true
      }
      return validClick_;
    }

    if (validClick(this.state.currentlocation.indexOf(true),newClick)) {
      const i = newClick
      const squares = this.state.squares
      const buildingheight = this.state.buildingheight.fill((this.state.buildingheight[i]+1), i, i+1)
      const player1Turn = !this.state.player1Turn
      this.setState({buildingheight})
        if (this.state.buildingheight[i] === 4) {

          this.setState({phase: "Game Over!"});
        } else {
          this.setState({buildingheight, phase:"select worker", player1Turn:player1Turn});
        }
  }
}



  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]}
    backgroundColor={this.state.bgColor[i]}
    height={this.state.buildingheight[i]}
    onClick={() => this.handleClick(i)} />

  );
  }


  render(){
    function whoseTurn(p) {
      let playernumber = ""
      if (p) {
        playernumber = "X";
      } else {
        playernumber = "T";
      }
      return playernumber;
    }
    function message(phase, player) {
      let message = ""
      if (phase === "Game Over!") {
        message = "Game Over! Congratulations, Player "+ player
      } else {
        message = "Game in progress"
      }
      return message
    }

    return (
      <div>
        <h1> Phase: {this.state.phase}</h1>
        <h2> Turn: Player  {whoseTurn(this.state.player1Turn)}  </h2>

        <h3>  {message(this.state.phase, whoseTurn(this.state.player1Turn))} </h3>
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
