import React, { Component } from "react";
import '../style/squares.css';

function Square(props) {

      return (
        <button className="square" onClick={props.onClick} style={{backgroundColor:props.backgroundColor}}>
          {props.value}{props.height}
        </button>
      );
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

  function whoseTurnInverse(p) {
      let playernumber = ""
      if (p) {
        playernumber = "T";
      } else {
        playernumber = "X";
      }
      return playernumber;
    }

function getAllIndexes(arr, val) {
  var indexes = [], i;

  for (i = 0; i < arr.length; i++)
      if (arr[i] === val)
          indexes.push(i);
  return indexes;
  }

export default class Squares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill(null),
      bgColor: Array(25).fill('white'),
      selected: Array(25).fill(false),
      hasWorker: Array(25).fill(false),
      currentlocation: Array(25).fill(false),
      buildingheight: Array(25).fill(0),
      workerSelected: null,
      phase: "choose starting positions: Player X (first worker)",
      player1Turn: true,

      savedGame:{squares:null,bgColor:null,selected:null,hasWorker:null,currentlocation:null,buildingheight:null,workerSelected:null,phase:null,player1Turn:null},
      savedGame2:{squares:null,bgColor:null,selected:null,hasWorker:null,currentlocation:null,buildingheight:null,workerSelected:null,phase:null,player1Turn:null},
      newGame:{squares:null,bgColor:null,selected:null,hasWorker:null,currentlocation:null,buildingheight:null,workerSelected:null,phase:null,player1Turn:null}
    };

    this.saveGame = this.saveGame.bind(this)
    this.loadGame = this.loadGame.bind(this)
    this.loadNewGame = this.loadNewGame.bind(this)

  }

  saveGame() {
       var savedGame = this.state.savedGame
      // const keys = Object.keys(savedGame)
      // for (let key in keys){
      //     savedGame[key]=this.state[key].slice(0)
      // }

      savedGame["squares"] =this.state.squares.slice(0)
      savedGame["bgColor"] = this.state.bgColor.slice(0)
      savedGame["selected"] = this.state.selected.slice(0)
      savedGame["hasWorker"] = this.state.hasWorker.slice(0)
      savedGame["currentlocation"] = this.state.currentlocation.slice(0)
      savedGame["buildingheight"] = this.state.buildingheight.slice(0)
      savedGame["workerSelected"] = this.state.workerSelected
      savedGame["phase"] = this.state.phase
      savedGame["player1Turn"] = this.state.player1Turn
      this.setState({savedGame})
  }
  saveGame2(){
      var savedGame2 = this.state.savedGame2
      savedGame2["squares"] =this.state.squares.slice(0)
      savedGame2["bgColor"] = this.state.bgColor.slice(0)
      savedGame2["selected"] = this.state.selected.slice(0)
      savedGame2["hasWorker"] = this.state.hasWorker.slice(0)
      savedGame2["currentlocation"] = this.state.currentlocation.slice(0)
      savedGame2["buildingheight"] = this.state.buildingheight.slice(0)
      savedGame2["workerSelected"] = this.state.workerSelected
      savedGame2["phase"] = this.state.phase
      savedGame2["player1Turn"] = this.state.player1Turn
      this.setState({savedGame2})
  }
  newGame(){
      var newGame = this.state.newGame
      newGame["squares"] =this.state.squares.slice(0)
      newGame["bgColor"] = this.state.bgColor.slice(0)
      newGame["selected"] = this.state.selected.slice(0)
      newGame["hasWorker"] = this.state.hasWorker.slice(0)
      newGame["currentlocation"] = this.state.currentlocation.slice(0)
      newGame["buildingheight"] = this.state.buildingheight.slice(0)
      newGame["workerSelected"] = this.state.workerSelected
      newGame["phase"] = this.state.phase
      newGame["player1Turn"] = this.state.player1Turn
      this.setState({newGame})

  }

  loadGame() {
      this.setState({squares:this.state.savedGame.squares, bgColor:this.state.savedGame.bgColor,
          selected:this.state.savedGame.selected,hasWorker:this.state.savedGame.hasWorker,
      currentLocation:this.state.savedGame.currentLocation,buildingheight:this.state.savedGame.buildingheight,
        workerSelected:this.state.savedGame.workerSelected, phase:this.state.savedGame.phase,
        player1Turn:this.state.savedGame.player1Turn})
  }
  loadGame2(){
      this.setState({squares:this.state.savedGame2.squares, bgColor:this.state.savedGame2.bgColor,
          selected:this.state.savedGame2.selected,hasWorker:this.state.savedGame2.hasWorker,
      currentLocation:this.state.savedGame2.currentLocation,buildingheight:this.state.savedGame2.buildingheight,
        workerSelected:this.state.savedGame2.workerSelected, phase:this.state.savedGame2.phase,
        player1Turn:this.state.savedGame2.player1Turn})
  }
  loadNewGame(){
      this.setState({squares:this.state.newGame.squares, bgColor:this.state.newGame.bgColor,
          selected:this.state.newGame.selected,hasWorker:this.state.newGame.hasWorker,
      currentLocation:this.state.newGame.currentLocation,buildingheight:this.state.newGame.buildingheight,
        workerSelected:this.state.newGame.workerSelected, phase:this.state.newGame.phase,
        player1Turn:this.state.newGame.player1Turn})
  }
handleClick(newClick) {

    if (this.state.phase === "choose starting positions: Player X (first worker)") {
        this.newGame()
        this.chooseStartX1(newClick)}
    if (this.state.phase === "choose starting positions: Player T (first worker)") {
        this.chooseStartT1(newClick)
    }
    if (this.state.phase === "choose starting positions: Player X (second worker)"){
        this.chooseStartX2(newClick)
    }
    if (this.state.phase === "choose starting positions: Player T (second worker)"){
        this.chooseStartT2(newClick)
    }
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

    chooseStartX1(newClick) {
        const i = newClick

        if(this.state.squares[i]!=="X" || this.state.squares[i]!=="T"){
            const squares = this.state.squares.fill((this.state.player1Turn)?"X":"T", i, i+1)
            const hasWorker = this.state.hasWorker.fill(true, i, i+1)
            const player1Turn = this.state.player1Turn
            this.setState({squares, hasWorker, player1Turn:!player1Turn, phase:"choose starting positions: Player T (first worker)"})
        }
    }
    chooseStartT1(newClick) {
        const i = newClick

        if(this.state.squares[i]!=="X" && this.state.squares[i]!=="T"){

            const squares = this.state.squares.fill((this.state.player1Turn)?"X":"T", i, i+1)
            const hasWorker = this.state.hasWorker.fill(true, i, i+1)
            const player1Turn = this.state.player1Turn
            this.setState({squares, hasWorker, player1Turn:!player1Turn, phase:"choose starting positions: Player X (second worker)"})
        }
    }
    chooseStartX2(newClick) {
        const i = newClick

        if(this.state.squares[i]!=="X" && this.state.squares[i]!=="T"){
            const squares = this.state.squares.fill((this.state.player1Turn)?"X":"T", i, i+1)
            const hasWorker = this.state.hasWorker.fill(true, i, i+1)
            const player1Turn = this.state.player1Turn
            this.setState({squares, hasWorker, player1Turn:!player1Turn, phase:"choose starting positions: Player T (second worker)"})
        }
    }
    chooseStartT2(newClick) {
        const i = newClick

        if(this.state.squares[i]!=="X" && this.state.squares[i]!=="T"){
            const squares = this.state.squares.fill((this.state.player1Turn)?"X":"T", i, i+1)
            const hasWorker = this.state.hasWorker.fill(true, i, i+1)
            const player1Turn = this.state.player1Turn
            this.setState({squares, hasWorker, player1Turn:!player1Turn, phase:"select worker"})
        }
    }

  handleSelect(newClick){
    const i = newClick;

    if ((this.state.squares[i] === "X"  && this.state.player1Turn) ||
    (this.state.squares[i] === "T" && !this.state.player1Turn)) {
       // CASE 3 : IF CLICK ON NOT SELECTED SQUARE WITH X
       this.saveGame2()
       this.setState({bgColor:Array(25).fill('red', i, i+1)})

       this.setState({selected:Array(25).fill(true,i,i+1)})
       this.setState({currentlocation:Array(25).fill(true, i, i+1)})
       this.setState({phase:"move worker"})
       this.possibleMoves2(i)

       console.log("bye")

    }
  }

  possibleMoves2 (currentLocation){
      const only1 = this.state.squares
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

      const height = this.state.buildingheight

      let possible = []
      let notpossible = []
      for (let newClick =0 ; newClick<25; newClick++){
          if (validClick(currentLocation,newClick,height)){
              possible[possible.length] = newClick
          } else {
              notpossible[notpossible.length] = newClick
          }
      }
      let bgColor = this.state.bgColor


      for (let index_for_possible=0; index_for_possible<possible.length; index_for_possible++){
          let i = possible[index_for_possible]
          bgColor[i]="turquoise"
      }
      for (let index_for_notpossible=0; index_for_notpossible<notpossible.length; index_for_notpossible++){
          let i = notpossible[index_for_notpossible]
          bgColor[i]="white"
      }
      bgColor[currentLocation]="pink"
      const bgColor_ = bgColor

      this.setState({bgColor:bgColor_})
  }

  possibleBuilds (currentLocation) {
      const only1 = this.state.squares
      const buildingheight = this.state.buildingheight
      function validBuild(j,newClick) {
          const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
          const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
          const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
          const only1x = getAllIndexes(only1, "X")
          const only1t = getAllIndexes(only1, "T")


          let validBuild_ = false;
          if (j % 5 === 0
          && currlocationcheckleft.indexOf(newClick)>-1
          && only1x.indexOf(newClick)<=-1
          && only1t.indexOf(newClick) <=-1
          && buildingheight[newClick] <=3){

            validBuild_ = true
          } else if (j % 5 === 4
        && currlocationcheckright.indexOf(newClick)>-1
        && only1x.indexOf(newClick)<=-1
        && only1t.indexOf(newClick) <=-1
        && buildingheight[newClick] <=3){

          validBuild_ = true
        } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1
        && only1x.indexOf(newClick)<=-1
        && only1t.indexOf(newClick) <=-1
        && buildingheight[newClick] <=3){

          validBuild_ = true
        }
        return validBuild_;
      }
      let possiblebuildlocations = []
      let notpossible = []
      for (let newClick=0; newClick <25; newClick++){
          if(validBuild(currentLocation, newClick)) {

              possiblebuildlocations[possiblebuildlocations.length] = newClick
          } else {

              notpossible[notpossible.length] = newClick
          }
      }

      let bgColor = this.state.bgColor


      for (let index_for_possiblebuild=0; index_for_possiblebuild<possiblebuildlocations.length;
          index_for_possiblebuild++){
          let i = possiblebuildlocations[index_for_possiblebuild]
          bgColor[i]="yellow"
      }
      for (let index_for_notpossible=0; index_for_notpossible<notpossible.length; index_for_notpossible++){
          let i = notpossible[index_for_notpossible]
          bgColor[i]="white"
      }
      bgColor[currentLocation]="pink"

      const bgColor_ = bgColor

      this.setState({bgColor:bgColor_})
  }

  noMoreMoves() {

        const locationOfWorkers = getAllIndexes(this.state.squares,
            (this.state.player1Turn)? "T": "X" )

        const player1Turn = !this.state.player1Turn
        const squares = this.state.squares
        const buildingheight = this.state.buildingheight

        function validMove(j,newClick, height) {
            const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
            const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
            const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
            const only1x = getAllIndexes(squares, "X")
            const only1t = getAllIndexes(squares, "T")
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



        function validBuild(j,newClick) {
            const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
            const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
            const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
            const only1x = getAllIndexes(squares, "X")
            const only1t = getAllIndexes(squares, "T")

            let validBuild_ = false;
            if (j % 5 === 0
            && currlocationcheckleft.indexOf(newClick)>-1
            && only1x.indexOf(newClick)<=-1
            && only1t.indexOf(newClick) <=-1
            && buildingheight[newClick] <=3){

              validBuild_ = true
            } else if (j % 5 === 4
          && currlocationcheckright.indexOf(newClick)>-1
          && only1x.indexOf(newClick)<=-1
          && only1t.indexOf(newClick) <=-1
          && buildingheight[newClick] <=3){

            validBuild_ = true
          } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1
          && only1x.indexOf(newClick)<=-1
          && only1t.indexOf(newClick) <=-1
          && buildingheight[newClick] <=3){

            validBuild_ = true
          }
          return validBuild_;
        }


        let gameOn = false
        for (let worker = 0; worker<2; worker++) {
            let locOfWoc = locationOfWorkers[worker]
            for (let move =0; move<25; move++) {
                for (let build = 0; build<25; build++) {
                    if (validMove(locOfWoc,move,buildingheight) && validBuild(move,build)) {
                        gameOn = true
                    }
                }
            }
        }
        if (!gameOn) {
            this.setState({player1Turn:!player1Turn, phase:"Game Over!"})
        }
    }

  handleMove(newClick){

    const prevX = this.state.selected.indexOf(true)
    const playerturn = whoseTurn(this.state.player1Turn)
    const only1 = this.state.squares
    const only1x = getAllIndexes(only1, "X")
    const only1t = getAllIndexes(only1, "T")
    const builidingheight = this.state.builidingheight
    const hasworker = this.state.hasWorker
    const selected = this.state.selected




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

    possibleBuilds2 = possibleBuilds2.bind(this)
    function possibleBuilds2(place){
        const only1 = this.state.squares
        const buildingheight = this.state.buildingheight



        function validBuild(j,newClick) {

            const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
            const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
            const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
            const only1x = getAllIndexes(only1, "X")
            const only1t = getAllIndexes(only1, "T")


            let validBuild_ = false;
            if (j % 5 === 0
            && currlocationcheckleft.indexOf(newClick)>-1
            && only1x.indexOf(newClick)<=-1
            && only1t.indexOf(newClick) <=-1
            && buildingheight[newClick] <=3){

              validBuild_ = true
            } else if (j % 5 === 4
          && currlocationcheckright.indexOf(newClick)>-1
          && only1x.indexOf(newClick)<=-1
          && only1t.indexOf(newClick) <=-1
          && buildingheight[newClick] <=3){

            validBuild_ = true
          } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1
          && only1x.indexOf(newClick)<=-1
          && only1t.indexOf(newClick) <=-1
          && buildingheight[newClick] <=3){

            validBuild_ = true
          }
          return validBuild_;
        }
        let possiblebuildlocations = []
        let notpossible = []
        for (let newClick=0; newClick <25; newClick++){
            if(validBuild(place, newClick)) {
                possiblebuildlocations[possiblebuildlocations.length] = newClick
            } else {
                notpossible[notpossible.length] = newClick
            }
        }
        return possiblebuildlocations.length
        }



    const i = newClick;

    if (this.state.selected[i]) {
      // CASE 1: IF CLICK ON RED SPACE

      this.setState({bgColor:Array(25).fill('white'),selected: Array(25).fill(false), phase:"select worker"})


    } else if (this.state.selected.indexOf(true)>-1){

      // CASE 2 : IF CLICK ON ANY SQUARE WHILE X IS SELECTED
      if (validClick(this.state.currentlocation.indexOf(true),newClick,
          this.state.buildingheight)) {
        const bgColor = Array(25).fill('white');
        const squares = this.state.squares.fill(whoseTurn(this.state.player1Turn), i, i+1).fill(null, prevX, prevX+1)
        const selected = Array(25).fill(false)
        const hasWorker = this.state.hasWorker.fill(true, i, i+1).fill(false, prevX, prevX+1)
        const place= this.state.currentlocation.indexOf(true)
        const currentlocation = Array(25).fill(true, i, i+1)

        this.setState({squares, bgColor})

        if (this.state.buildingheight[newClick] === 3) {
          this.setState({bgColor,selected, hasWorker, phase:"Game Over!", currentlocation})
        } else {
        this.setState({squares,bgColor,selected, hasWorker, phase:"build layer", currentlocation})
        this.possibleBuilds(i)
        }

        }

    }
}

  handleBuild(newClick){

    const only1 = this.state.squares
    const buildingheight = this.state.buildingheight
    function getAllIndexes(arr, val) {
      var indexes = [], i;

      for (i = 0; i < arr.length; i++)
          if (arr[i] === val)
              indexes.push(i);
      return indexes;
    }

    function validBuild(j,newClick) {
        const currlocationcheckleft = [j+1, j+5, j-5, j+6, j-4]
        const currlocationcheckright = [j-1, j-5, j+5, j+4, j-6]
        const currlocationcheckelse = [ j+1, j-1, j+5, j-5, j+6, j-6, j+4, j-4]
        const only1x = getAllIndexes(only1, "X")
        const only1t = getAllIndexes(only1, "T")

        let validBuild_ = false;
        if (j % 5 === 0
        && currlocationcheckleft.indexOf(newClick)>-1
        && only1x.indexOf(newClick)<=-1
        && only1t.indexOf(newClick) <=-1
        && buildingheight[newClick] <=3){

          validBuild_ = true
        } else if (j % 5 === 4
      && currlocationcheckright.indexOf(newClick)>-1
      && only1x.indexOf(newClick)<=-1
      && only1t.indexOf(newClick) <=-1
      && buildingheight[newClick] <=3){

        validBuild_ = true
      } else if (j %5 != 0 && j%5 != 4 && currlocationcheckelse.indexOf(newClick)>-1
      && only1x.indexOf(newClick)<=-1
      && only1t.indexOf(newClick) <=-1
      && buildingheight[newClick] <=3){

        validBuild_ = true
      }
      return validBuild_;
    }


    if (validBuild(this.state.currentlocation.indexOf(true),newClick)) {
      const i = newClick
      const squares = this.state.squares
      const buildingheight = this.state.buildingheight.fill((this.state.buildingheight[i]+1), i, i+1)
      const player1Turn = !this.state.player1Turn
      const bgColor = this.state.bgColor.fill("white", Array(25))
      this.setState({buildingheight, phase:"select worker", player1Turn:player1Turn, bgColor});
      this.noMoreMoves()
        }
    if (this.state.currentlocation.indexOf(true)===newClick) {
        this.loadGame2();
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
      <div>
        <header className="button-bar">
        <button className="new-game" onClick={this.loadNewGame}>Start New Game</button>
        <button className="savedGamebutton" onClick={this.saveGame}>Save Game!</button>
        <button className="loadGameButton" onClick={this.loadGame}>Load last save</button>
        </header>
        <header className="status">
        <span className="phase">Phase:</span><span className="statephase"> {this.state.phase}</span><span className="phase"> Turn:</span><span className="statephase"> Player  {whoseTurn(this.state.player1Turn)}  </span>
        </header>
        </div>
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
          <div>
          <h3>  {message(this.state.phase, whoseTurn(this.state.player1Turn))} </h3>
          </div>
        </div>
      );
    }
  }
