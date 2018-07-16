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
      squares: Array(25).fill("X", 12, 13).fill("X", 0, 1),
      bgColor: Array(25).fill('white'),
      selected: Array(25).fill(false),
      currentlocation: Array(25).fill(true, 12, 13),
      buildingheight: Array(25).fill(0),
      workerSelected: null,
      phase: "select worker"


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
    if (this.state.squares[i] === "X") {
     // CASE 3 : IF CLICK ON NOT SELECTED SQUARE WITH X
     this.setState({bgColor:Array(25).fill('red', i, i+1)})
     this.setState({selected:Array(25).fill(true,i,i+1)})
     this.setState({currentlocation:Array(25).fill(true, i, i+1)})
     this.setState({phase:"move worker"});
    }

  }


  handleMove(newClick){
    const prevX = this.state.selected.indexOf(true)
    function validClick(j,newClick, height) {
        const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
        const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
        const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
        let validClick_ = false;
        if (j % 5 === 0
        && currlocationcheckleft.indexOf(newClick)>-1 && height[j]+1 >= height[newClick]){

          validClick_ = true
        } else if (j % 5 === 4
      && currlocationcheckright.indexOf(newClick)>-1 && height[j]+1 >= height[newClick]) {

        validClick_ = true
      } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1 && height[j]+1 >= height[newClick]) {

        validClick_ = true
      }
      return validClick_;
    }

    const i = newClick;

    if (this.state.selected[i]) {
      // CASE 1: IF CLICK ON RED SPACE
      this.setState({bgColor:Array(25).fill('white'),selected: Array(25).fill(false), phase:"select worker"})
    } else if (this.state.selected.indexOf(true)>-1){
      // CASE 2 : IF CLICK ON ANY SQUARE WHILE X IS SELECTED

      if (validClick(this.state.currentlocation.indexOf(true),newClick, this.state.buildingheight)) {
        const bgColor = Array(25).fill('white');
        const squares = this.state.squares.fill("X", i, i+1).fill(null, prevX, prevX+1)
        const selected = Array(25).fill(false)

        const currentlocation = Array(25).fill(true, i, i+1)

        this.setState({squares,bgColor,selected, phase:"build layer", currentlocation})
      }

    }
  }

  handleBuild(newClick){
    function validClick(j,newClick) {
        const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
        const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
        const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
        let validClick_ = false;
        if (j % 5 === 0
        && currlocationcheckleft.indexOf(newClick)>-1){

          validClick_ = true
        } else if (j % 5 === 4
      && currlocationcheckright.indexOf(newClick)>-1) {

        validClick_ = true
      } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1) {

        validClick_ = true
      }
      return validClick_;
    }

    if (validClick(this.state.currentlocation.indexOf(true),newClick)) {
      const i = newClick
      const buildingheight = this.state.buildingheight.fill((this.state.buildingheight[i]+1), i, i+1)
      this.setState({buildingheight, phase:"select worker"})
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
    return (
      <div>
        <h1> Phase: {this.state.phase}</h1>
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
