import "../styles.css";
import LangData from '../data/SocialPhraseCLM'
import { useState, useEffect } from 'react';

export default function StoryGrid3 () {

// let [stemsARR, setStemsARR] = useState([]);
let [rootsARR, setRootsARR] = useState([]);
let [viewState, setViewState] = useState('overview');

const [hover, setHover] = useState(false);
const handleMouseIn = ()=> {setHover(true) };
const handleMouseOut = ()=> {setHover(false) };


useEffect(() => {
    loadTokenData();
 }, [])

 function loadTokenData(){
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


function TokenCard({ token, onTokenClick }) {
    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
        alignContent:'flex-end',alignItems:'stretch',height:'10em',width:'95%',
        flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly'
    } 
    let fontColor = (token.state==='prize')?'mediumpurple':(token.state==='clue')
                    ?'#d08701':(token.state==='locked')?'#de6666':'steelblue';
    //GAMIFICATION AGENT
    let gameTitle = gameAGENT(token); 
    return (
        <button style={cardStyle} onClick={onTokenClick} className={hover?'btnHover':''}
            onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
            { (token.state)?
            <section style={{background:'lightskyblue',flex:'1',borderTopLeftRadius:'13px',
                borderTopRightRadius:'13px',display:'flex',justifyContent:'center',
                color:fontColor,
                alignItems:'center',fontSize:'xx-large',paddingTop:'0.333em'}}>
                {gameTitle}
            </section>
            :
            <section style={{background:'lightskyblue',flex:'1',borderTopLeftRadius:'13px',
                borderTopRightRadius:'13px',display:'flex',justifyContent:'center',
                color:'#2374b7',
                alignItems:'flex-end',fontSize:'large',paddingBottom:'0.222em'}}>
                {token.title}
            </section>            
            }
            <footer style={{background:'cornflowerblue',fontSize:'x-small',
                borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',
                color:'#4c038c'}}>
                {token.numz}
            </footer>
        </button>
    );
}

function gameAGENT(token){ //REACT to state and RESPOND
  if(!token){return ''}
  else if (token.state==='locked'){return 'X'}
  else if (token.state==='prize'){return '!'}
  else if (token.state==='clue'){return '?'}
}

function PageView (){ 
    return(<>
    <main className='pageview' style={{background:'skyblue',borderRadius:'6px',
        display:'flex',width:'100%',flexDirection:'column',marginRight:'1.444em'}}>
        <header style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={{width:'4em'}} 
                onClick={ ()=>{setViewState('overview')}}>UP</button>
            <button style={{width:'4em'}} 
                onClick={ ()=>{setViewState('overview')}}>RIGHT</button>
        </header>
        <article style={{flex:1}}>
            x
        </article>
        <footer style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={{width:'4em'}} 
                onClick={ ()=>{setViewState('overview')}}>LEFT</button>
            <button style={{width:'4em'}} 
                onClick={ ()=>{setViewState('overview')}}>DOWN</button>
        </footer>
        {/* <button style={{width:'4em',    flex: 1,
    flexDirection:'row',
    alignSelf: "right",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.666,
    borderRadius: 20
    }} 
            onClick={ ()=>{setViewState('detailview')}}>details</button> */}
    </main>
    </>)
}

function DetailView (){ 
    return(
    <>
        <button onClick={ ()=>{  setViewState('overview');  }  } >home</button>
        <button onClick={ ()=>{  setViewState('pageview');  }  } >page</button>
    </>
    )
}

function TokenGrid (){ //"Everything's a token!" A grid for everything - Episodic TOKENS wrapped into COLUMNS:
    let colm = [];
    let COLNUM=3; //vertical wrap limit
    let tokenCOLUMNS = [];
    let humanIDX = 0; //column header
    for(let i=0; i<tokenz.length; i += COLNUM){
        colm = tokenz.slice(i,i+COLNUM);
        ++humanIDX;
         tokenCOLUMNS.push( <div style={{display:'flex',flexDirection:'column',flex:'1 1 0'}}>
            <header>{humanIDX}</header>
            { colm.map( (token,idx)=>{ 
                return <TokenCard token={token} onTokenClick={() => onTokenClick(token)} />
            }) }
         </div> 
         );
    }    
    return(tokenCOLUMNS)
}

function onTokenClick( token ){ 
    console.log('A',token.numz);
    setViewState("pageview");
    //Show PageView of Item
}

//----------------------END TOKEN-GRID------------------------------------
let btnCardStyle = { background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
alignContent:'flex-end',alignItems:'stretch',height:'10em',flex:'1',minWidth:'6em',
flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly' }

return (
    < >
    <h1>StoryGrid</h1>
<main style={{overflowY:'auto'}}>
    <section className='mainframe' style={{display:'flex',display:'flex',justifyContent:'space-evenly',
    paddingLeft:'1.444em',paddingRight:'1.444em',flex:1}}>
        { (viewState==='overview') ?
            <TokenGrid/>
        : (viewState==='pageview') ?
           <PageView/>
        : (viewState==='detailview') ?
            <DetailView/>
        : <TokenGrid/>
        }
        {/* <TokenGrid/> */}
    </section>
    <section style={{display:'flex',justifyContent:'flex-start',paddingLeft:'1.444em',
        paddingRight:'1.444em',flexWrap:'wrap'}}>
        {/* <div style={btnCardStyle}>X</div> */}
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
    </section>

        </main>
        <footer style={{marginTop:'2em'}}>
        A grid for everything - Episodic TOKENS in COLUMNS - "Everything's a token".
        </footer>
    </>
)

};