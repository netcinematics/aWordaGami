import "../styles.css";
import LangData from '../data/SocialPhraseCLM'
import { useState, useEffect } from 'react';
import TokenFrame from "./TokenFrame3";
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

export default function StoryGrid4 () {
let [rootsARR, setRootsARR] = useState([]);
let [viewState, setViewState] = useState('overview');
// let [tokenDetailArray, setTokenDetailArray] = useState([]);
let [selectedToken, setSelectedToken] = useState({});

// const [hover, setHover] = useState(false);
// const handleMouseIn = ()=> {setHover(true) };
// const handleMouseOut = ()=> {setHover(false) };

let [markdownDATA, setMarkdownDATA] = useState("");
let [tokenzDATA, setTokenzDATA] = useState([]);
useEffect(() => { document.title = "Good_Ai";  }, []);
// useEffect(() => { getMarkdownDATA(); }, [])
useEffect(() => { getTokenzDATA() }, []);

function getTokenzDATA(){
    const options = {
        method: 'GET',
        // url: 'https://node-dashboard-server.vercel.app/ai2',
        params: {'lookup':'tokenz'},
        url: 'http://localhost:8008/libz/tokenz/',
    }
    axios.request(options).then((response) => {
        // console.log(response.data.tokenz)
        // displayTokenz(response.data.tokenz)
        setTokenzDATA(response.data.tokenz)
    }).catch((error) => {
        console.error(error)
    })    
}

function getMarkdownDATA(){
    const options = {
        method: 'GET',
        // url: 'https://node-dashboard-server.vercel.app/ai2',
        params: {'lookup':'tokenz'},
        url: 'http://localhost:8008/libz/',
    }
    axios.request(options).then((response) => {
        displayMarkdown(response.data)
    }).catch((error) => {
        console.error(error)
    })    
}

// function displayTokenz(tokenz){
//     setTokenzDATA(tokenz)
// }

function displayMarkdown(md){
    // setMarkdownDATA(md)
    let spaceData = md.split(' ');
    let linkData = spaceData.map( (item)=>{
        if(item.includes('~')){
            return '!~!'
        } else if (item.includes('_')) {
            return '!_!'
        } else {
            return item
        }
    } )
    setMarkdownDATA(md)
}

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


function TokenCard({ token }) {
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
        <TokenFrame token={token} setMainViewStatefn={setMainViewStatefn}/>
    );
}

function gameAGENT(token){ //REACT to state and RESPOND
  if(!token){return ''}
  else if (token.state==='locked'){return 'X'}
  else if (token.state==='prize'){return '!'}
  else if (token.state==='clue'){return '?'}
}

let pageViewBtnStyle = {width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue'}

function PageView ( {token}){ 
    useEffect(() => {
        // loadTokenData();
     }, token)
    return(<>
    <main className='pageview' style={{background:'skyblue',borderRadius:'6px',
        display:'flex',width:'100%',flexDirection:'column',marginRight:'1.444em'}}>
        <header style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setViewState('overview')}}>UP</button>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setViewState('overview')}}>RIGHT</button>
        </header>
        <article style={{flex:1, color:'steelblue'}}>
            {(token && token.title)?token.title:'_'}
            {/* {(selectedToken && selectedToken.title)?selectedToken.title:'_'} */}
            <hr></hr>

            { 
            //    (selectedToken && selectedToken.details && selectedToken.details.length) ?
               (token && token.details && token.details.length) ?
            // tokenDetailArray.map( (token)=>{ 
                // selectedToken.details.map( (token)=>{ 
                token.details.map( (item)=>{ 
                // return <TokenCard token={token}/>
                return <DetailView/>
            }) 
            : '~'
            }


        </article>
        <footer style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setViewState('overview')}}>LEFT</button>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{addTokenDetail()}}>DOWN</button>
        </footer>
    </main>
    </>)
}

let exampleDetail = {key:'a13',txt:"add details",title:'a13',ctx:{}}

function addTokenDetail(){
    // setTokenDetailArray([...tokenDetailArray, exampleDetail]);
    if(!selectedToken ) return;
    let newTokenDetails = selectedToken;
    if(!newTokenDetails.details) newTokenDetails.details = [];
    newTokenDetails.details.push(exampleDetail)
    setSelectedToken(newTokenDetails);
}


function DetailView (){ 
    return(
    <>
        <h1>example detals</h1>
        <button onClick={ ()=>{  setViewState('overview');  }  } >1</button>
        <button onClick={ ()=>{  setViewState('pageview');  }  } >11</button>
    </>
    )
}

function TokenGrid (){ 
    let colm = [];
    let COLNUM=3; //vertical wrap limit
    let tokenCOLUMNS = [];
    let humanIDX = 0; //column header
    for(let i=0; i<tokenzDATA.length; i += COLNUM){
        colm = tokenzDATA.slice(i,i+COLNUM);
        ++humanIDX;
         tokenCOLUMNS.push( <div style={{display:'flex',flexDirection:'column',flex:'1 1 0'}}>
            <header>{humanIDX}</header>
            { colm.map( (token)=>{ 
                return <TokenCard token={token}/>
                // return <TokenCard token={token} onTokenClick={() => onTokenClick(token)} />
            }) }
         </div> 
         );
    }    
    return(tokenCOLUMNS)
}

function setMainViewStatefn(selection,token){ //update app, show view
    setViewState(selection);
    setSelectedToken(token);
}

let btnCardStyle = { background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
alignContent:'flex-end',alignItems:'stretch',height:'10em',flex:'1',minWidth:'6em',
flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly' }

return (
    < >
    <h1>StoryTree</h1>
    {/* <ReactMarkdown>
            {markdownDATA}
        </ReactMarkdown> */}
<main style={{overflowY:'auto'}}>
    <section className='mainframe' style={{display:'flex',display:'flex',justifyContent:'space-evenly',
    paddingLeft:'1.444em',paddingRight:'1.444em',flex:1}}>
        { (viewState==='overview') ?
            <TokenGrid/>
        : (viewState==='pageview') ?
           <PageView token={selectedToken}/>
        // : (viewState==='detailview') ?
        //     <DetailView/>
        : <TokenGrid/>
        }
    </section>
    {/* <section style={{display:'flex',justifyContent:'flex-start',paddingLeft:'1.444em',
        paddingRight:'1.444em',flexWrap:'wrap'}}>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
    </section> */}

        </main>
        <footer style={{marginTop:'2em'}}>
          WORD_GAME TOKENZ".
        </footer>
    </>
)

};