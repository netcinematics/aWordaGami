// import { useState } from 'react';
import "../styles.css";

export default function TokenGrid2 ({langData}) {

// console.log('x1',langData.roots.length)  

//----------------------TOKEN-GRID------------------------------------

const tokenz = [  //NUMZ INFORMATION-ARCHITECTURE
    { title: 'First', numz: '1_0', id:1 },
    { title: 'First.1', numz: '1_1', id:4 },
    { title: 'First.2', numz: '1_2', id:5 },
    { title: 'First.2', numz: '1_3', id:7,state:'locked' },
    { title: 'Second', numz: '2_0', id:2},
    { title: 'Second.1', numz: '2_1', id:6},
    { title: 'Second.2', numz: '2_2', id:8, state:'clue'},
    { title: 'Third', numz: '3_0', id:3 },
    { title: 'Third.1', numz: '3_1', id:9, state:'prize' },
  ];


function TokenCard({ value, onTokenClick }) {
    let cardStyle =  {
        background: '#6facf7',
        border: '1px solid #444',
        lineHeight: '20px',
        margin: '0.5em',
        borderRadius: '13px',
        boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer',
        color: '#013434',
        textShadow: '-1px 0px 1px whitesmoke'
    } 
    //GAMIFICATION AGENT
    // console.log('AGENT tst',value)
    // let displayValue = gameAGENT(value); 
    return (
        <button style={cardStyle} onClick={onTokenClick}>
        {/* {displayValue} */}
        {value}
        </button>
    );
}

function gameAGENT(token){ //REACT to state and RESPOND
  if(!token){return ''}
  if(!token.state){return token.numz}
  else if (token.state==='locked'){return 'X'}
  else if (token.state==='prize'){return '!'}
  else if (token.state==='clue'){return '?'}
}

function TokenGrid (){ //Everything is a token.
    function onTokenClick(){
        console.log('ASD')
    }
    // console.log('x2',langData.roots.length)  
    let COLNUM=4;
    //roots already sorted by "rhyme-closeness" by agents.
    //agent_RHYMECLOSE()
    //sort tokens by letter density, AGENT 
    //agent_LETTERDENSITY()
    //then cut into columns of maxCOL AGENT
    //agent_COLUMNCUT() 

  
    //CONVERT WORDS into TOKENS:
    // let tokenCardARR = langData.roots.map( (word, idx)=>{
    //     return <TokenCard value={word} onTokenClick={() => onTokenClick(idx)} />
    // });

    //CUT TOKENS into COLUMNS:
    let tokenCOLARR = [];
    let colm = [];
    // debugger;
    let humanIDX = 0;
    let tokenCOLUMNS = [];
    for(let i=0; i<langData.roots.length; i += COLNUM){
        colm = langData.roots.slice(i,i+COLNUM);
        // console.log('COLM',colm.length)
        ++humanIDX;
         tokenCOLUMNS.push( <div style={{display:'flex',flexDirection:'column'}}>
            <header>{humanIDX}</header>
            {
                colm.map( (word,idx)=>{ 
                    return <TokenCard value={word} onTokenClick={() => onTokenClick(idx)} />
                    // return <div>{word}</div> 
                })
            }

         </div> 
         );
        
        

    }    
    
    
    // //CONVERT WORDS into TOKENS:
    // let tokenCardARR = langData.roots.map( (word, idx)=>{
    //     return <TokenCard value={word} onTokenClick={() => onTokenClick(idx)} />
    // });

    // //CUT TOKENS into COLUMNS:
    // let tokenCOLARR = [];
    // let colm = [];
    // debugger;
    // for(let i=0; i<tokenCardARR.length; i += COLNUM){
    //     colm = tokenCardARR.slice(i,i+COLNUM);
    //     console.log('COLM',colm.length)
    //     // tokenCOLARR.push( <div> )
    //     tokenCOLARR.push( colm )
    //     // tokenCOLARR.push( </div> )
    // }

    // let tokenCOLUMNS = tokenCOLARR.map( (item,idx)=>{

    //     return <column style={{display:'flex',flexDirection:'column'}}>
    //         <header>{idx}</header>
    //         {
    //             item
    //         }
    //     </column>


    // });

    // let tokenCOLARR = tokenCardARR.map( (tokn,idx)=>{ 

    // });

    return(tokenCOLUMNS)
    // return(tokenCardARR)
    // return(tokenCOLARR)

    // return ([
    //      <div className="status">{".!."}</div>
    //      ,
    //       <div className="board-row">
    //         <TokenCard value={tokenz[0]} onTokenClick={() => onTokenClick(0)} />
    //         <TokenCard value={tokenz[1]} onTokenClick={() => onTokenClick(1)} />
    //         <TokenCard value={tokenz[2]} onTokenClick={() => onTokenClick(2)} />
    //       </div>
    // ])
    // return (

    //       <>
    //       <div className="status">{"..."}</div>
    //       <div className="board-row">
    //         <TokenCard value={tokenz[0]} onTokenClick={() => onTokenClick(0)} />
    //         <TokenCard value={tokenz[1]} onTokenClick={() => onTokenClick(1)} />
    //         <TokenCard value={tokenz[2]} onTokenClick={() => onTokenClick(2)} />
    //       </div>
    //       <div className="board-row">
    //         <TokenCard value={tokenz[3]} onTokenClick={() => onTokenClick(3)} />
    //         <TokenCard value={tokenz[4]} onTokenClick={() => onTokenClick(4)} />
    //         <TokenCard value={tokenz[5]} onTokenClick={() => onTokenClick(5)} />
    //       </div>
    //       <div className="board-row">
    //         <TokenCard value={tokenz[6]} onTokenClick={() => onTokenClick(6)} />
    //         <TokenCard value={tokenz[7]} onTokenClick={() => onTokenClick(7)} />
    //         <TokenCard value={tokenz[8]} onTokenClick={() => onTokenClick(8)} />
    //       </div>
    //     </>


    // );
}

//----------------------END TOKEN-GRID------------------------------------


return (
    <>
    <tokengridframe style={{display:'flex',width:'100%',justifyContent:'space-around'}}>
        <TokenGrid/>
    </tokengridframe>
    </>
)

};