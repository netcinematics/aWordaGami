import { useState } from 'react';
import example1 from '../img/tictactoe1.png'
import "../styles.css";

export default function TikTacToeView () {

    function Tile({ value, onTileClick }) {

        function getTileCLASS(){ //custom metadata state visualization
          return  (value==='O') ? 'knot tile'  : 'cross tile';
        }

        return (
          <button className={getTileCLASS()} onClick={onTileClick}>
           {/* <button className="tile" onClick={onTileClick}> */}
            {value}
          </button>
        );
    }
      
      function Board({ xIsNext, squares, onPlay }) {
        function handleClick(i) {
          let result = calculateWinner(squares);
          console.log('res',result)
          if (result ==='O' || result==='X' || squares[i]) {
            return;
          } else if (result==='CAT'){
            statusLable='CAT GAME';
            return;
          }
          const nextSquares = squares.slice();
          if (xIsNext) {
            nextSquares[i] = 'X';
          } else {
            nextSquares[i] = 'O';
          }
          onPlay(nextSquares);
        }
     

        const winner = calculateWinner(squares); //customized for color
        let statusLable = '', statusSymbol = null;
        if(winner==='CAT'){
          statusLable = 'CAT GAME';
          statusSymbol = 0;          
        }
        if (winner) {
          statusLable = 'Winner';
          statusSymbol = winner;
        } else {
          statusLable = 'Next player';
          statusSymbol = (xIsNext ? 'X' : 'O');
        }
      
        return (
          <>
            <style>{`
                .knot{ color:steelblue !important}
                .cross{ color:lightcoral !important} 
            `}</style>
            <div className="board-row">
              <Tile value={squares[0]} onTileClick={() => handleClick(0)} />
              <Tile value={squares[1]} onTileClick={() => handleClick(1)} />
              <Tile value={squares[2]} onTileClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Tile value={squares[3]} onTileClick={() => handleClick(3)} />
              <Tile value={squares[4]} onTileClick={() => handleClick(4)} />
              <Tile value={squares[5]} onTileClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Tile value={squares[6]} onTileClick={() => handleClick(6)} />
              <Tile value={squares[7]} onTileClick={() => handleClick(7)} />
              <Tile value={squares[8]} onTileClick={() => handleClick(8)} />
            </div>
            <div className="status" style={{fontSize:'xxx-large',color:'yellow'}}>{statusLable}:&nbsp;
              <span className={(statusSymbol==='O') ? 'knot'  : 'cross'}>{statusSymbol}</span></div>
          </>
        );
      }
      
      function Game() {
        const [history, setHistory] = useState([Array(9).fill(null)]);
        const [currentMove, setCurrentMove] = useState(0);
        const xIsNext = currentMove % 2 === 0;
        const currentSquares = history[currentMove];
      
        function handlePlay(nextSquares) {
          const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
          setHistory(nextHistory);
          setCurrentMove(nextHistory.length - 1);
        }
      
        function jumpTo(nextMove) {
          setCurrentMove(nextMove);
        }
      
        const moves = history.map((squares, move) => {
          let description;
          if (move > 0) {
            description = 'Go to move #' + move;
          } else {
            description = 'Go to game start';
          }
          return (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
          );
        });
      
        return (
          <div className="game">
            <div className="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
      
      function calculateWinner(squares) {
        const lines = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
                        [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]  ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b]
             && squares[a] === squares[c]) { return squares[a]; //WIN
          } 
        }
        if(squares.includes(null)){ return null} //Not over
        return 'CAT'; //Modified to include TIE GAME-.
      }


//----------------------TOKEN-GRID------------------------------------


return (
  <article style={{display:'flex',flexDirection:'column',height:'100%'}}>
    <style>{`
      .tile{
        cursor: pointer;
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding:0;
        text-align: center;
        width: 34px; 
        border-radius:5px;
        margin:2px;       
      } 
    `}</style>
    <h1>TicTacToe Example</h1>
    <section style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
     <Game/>
    </section>
    <section style={{display:'flex',flexDirection:'column',margin:'2em',alignItems:'center',
      marginBottom:'0.8em'}}>
      This ALGORITHM detects WIN condition, REFLECTS STATE:
      <img src={example1} style={{width:'90%',marginTop:'1em'}}></img>
    </section>
    <footer  style={{marginBottom:'1em'}}>From <a href='https://legacy.reactjs.org/tutorial/tutorial.html'>
       ReactJS Getting Started</a>. Loops all possibities - to "detect" condition.</footer>
    <section style={{paddingBottom:'2em'}}>
      Demonstrates: algorithm, state and agent concepts.
    </section>
  </article>
)

};