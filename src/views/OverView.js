import { useState } from 'react';
import "../styles.css";

export default function OverView () {

    function Square({ value, onSquareClick }) {
        return (
          <button className="square" onClick={onSquareClick}>
            {value}
          </button>
        );
    }
      
      function Board({ xIsNext, squares, onPlay }) {
        function handleClick(i) {
          if (calculateWinner(squares) || squares[i]) {
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
      
        const winner = calculateWinner(squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
      
        return (
          <>
            <div className="status">{status}</div>
            <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
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
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }


    //   const listItems = tokenz.map(item =>
    //     <li key={item.id}>
    //       {item.title}
    //     </li>
    //   );
      

//----------------------TOKEN-GRID------------------------------------

const tokenz = [
    { title: 'First', numz: '1_0', id:1 },
    { title: 'First.1', numz: '1_1', id:4 },
    { title: 'First.2', numz: '1_2', id:5 },
    { title: 'First.2', numz: '1_3', id:7 },
    { title: 'Second', numz: '2_0', id:2},
    { title: 'Second.1', numz: '2_1', id:6},
    { title: 'Second.1', numz: '2_2', id:8},
    { title: 'Third', numz: '3_0', id:3 },
    { title: 'Third', numz: '3_1', id:9 },
  ];

function TokenCard({ value, onTokenClick }) {
    let cardStyle =  {
        background: '#6facf7',
        border: '1px solid #444',
        lineHeight: '34px',
        /* height: 23%, */
        /* margin-right: -1px, */
        /* margin-top: -1px, */
        padding: '1em',
        textAlign: 'center',
        width: '10%',
        margin: '0.5em',
        borderRadius: '13px',
        boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer',
        fontFamily: 'fangsong',
        color: '#013434',
        textShadow: '-1px 0px 1px whitesmoke'
    }    
    return (
        <button style={cardStyle} onClick={onTokenClick}>
        {value}
        </button>
    );
}

function TokenGrid (){ //Everything is a token.
    function onTokenClick(){
        // console.log('ASD')
    }
    return (

          <>
          <div className="status">{"..."}</div>
          <div className="board-row">
            <TokenCard value={tokenz[0].numz} onTokenClick={() => onTokenClick(0)} />
            <TokenCard value={tokenz[1].numz} onTokenClick={() => onTokenClick(1)} />
            <TokenCard value={tokenz[2].numz} onTokenClick={() => onTokenClick(2)} />
          </div>
          <div className="board-row">
            <TokenCard value={tokenz[3].numz} onTokenClick={() => onTokenClick(3)} />
            <TokenCard value={tokenz[4].numz} onTokenClick={() => onTokenClick(4)} />
            <TokenCard value={tokenz[5].numz} onTokenClick={() => onTokenClick(5)} />
          </div>
          <div className="board-row">
            <TokenCard value={tokenz[6].numz} onTokenClick={() => onTokenClick(6)} />
            <TokenCard value={tokenz[7].numz} onTokenClick={() => onTokenClick(7)} />
            <TokenCard value={tokenz[8].numz} onTokenClick={() => onTokenClick(8)} />
          </div>
        </>


    );
}

//----------------------END TOKEN-GRID------------------------------------


return (
    <>
    <h1>GalleryGrid</h1>
     <Game/>
     {/* <Board/> */}
     <hr></hr>
     <TokenGrid/>
            {/* <ul>
          {listItems}
        </ul> */}
    </>
)

};