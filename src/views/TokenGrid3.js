// import { useState } from 'react';
import "../styles.css";
import LangData from '../data/SocialPhraseCLM'
import SuffixMap from '../data/SuffixMap'

import { useState, useEffect } from 'react';

export default function TokenGrid3 ({langData}) {

let [stemsARR, setStemsARR] = useState([]);
let [rootsARR, setRootsARR] = useState([]);

useEffect(() => {
    loadTokenData();
 }, [])

 function loadTokenData(){
    // debugger;
    let nn = LangData(); 
    let tgtRootARR = [], tgtStemARR=[],tgtRootSTR='';
    for(let i=0; i<nn.length;i++){ //TASK: LOOP nn, match exact, match synonym, sort by length
        tgtStemARR = nn[i].split(' ');
        tgtRootSTR = tgtStemARR[tgtStemARR.length-1];
        tgtRootARR.push(tgtRootSTR);//Save ROOT.
    }

    setRootsARR( tgtRootARR );
    // setStemsARR( tgtStemSET );

 }

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
    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',padding:'0.444em',
        display:'flex',alignContent:'flex-end',alignItems:'flex-end',height:'10em',width:'8em'
    } 
    //GAMIFICATION AGENT
    console.log('AGENT tst',value)
    let displayValue = gameAGENT(value); 
    return (
        <button style={cardStyle} onClick={onTokenClick}>
        {displayValue}
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

function TokenGrid (){ //"Everything is a token". A grid for everything - Episodic TOKENS wrapped into COLUMNS:
    function onTokenClick(){ console.log('AS222')}
    let colm = [];
    let COLNUM=3; //vertical wrap limit
    let tokenCOLUMNS = [];
    let humanIDX = 0; //column header
    for(let i=0; i<tokenz.length; i += COLNUM){
        colm = tokenz.slice(i,i+COLNUM);
        ++humanIDX;
         tokenCOLUMNS.push( <div style={{display:'flex',flexDirection:'column'}}>
            <header>{humanIDX}</header>
            { colm.map( (token,idx)=>{ 
                return <TokenCard value={token.numz} onTokenClick={() => onTokenClick(token.numz)} />
            }) }
         </div> 
         );
    }    
    return(tokenCOLUMNS)
}

//----------------------END TOKEN-GRID------------------------------------


return (
    <>
    <tokengridframe style={{display:'flex',display:'flex',justifyContent:'flex-start',paddingLeft:'1.444em'}}>
        <TokenGrid/>
    </tokengridframe>
        <footer style={{marginTop:'2em'}}>
        "Everything is a token". A grid for everything - Episodic TOKENS in COLUMNS.
        </footer>
    </>
)

};