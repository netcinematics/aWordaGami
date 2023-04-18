import { useState } from 'react';
import "../styles.css";

export default function OverView () {

  

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
    <h1>TokenGrid</h1>
     <hr></hr>
     <TokenGrid/>
    </>
)

};