import "../styles.css";
import LangData from '../data/SocialPhraseCLM'
import { useState, useEffect } from 'react';
import TokenFrame from "./TokenFrame3";
import axios from 'axios'
// import ReactMarkdown from 'react-markdown'

export default function StoryGrid () {
    useEffect(() => { document.title = "Good_Ai";  }, []);
    let [rootsARR, setRootsARR] = useState([]);
    let [viewState, setViewState] = useState('overview');
    let [selectedToken, setSelectedToken] = useState({});

    let [markdownDATA, setMarkdownDATA] = useState("");
    let [tokenzDATA, setTokenzDATA] = useState([]);
    let [tokenzCOUNT, setTokenzCOUNT] = useState("");

useEffect(() => { getTokenzDATA() }, [tokenzCOUNT]);
function getTokenzDATA(){
    const options = {
        method: 'GET',
        // url: 'https://node-dashboard-server.vercel.app/ai2', //prod url
        params: {'lookup':'tokenz'},
        url: 'http://localhost:8008/libz/tokenz/',
    }
    axios.request(options).then((response) => {
        setTokenzDATA(response.data.tokenz)
        setTokenzCOUNT("tokenz "+response.data.tokenz.length)
    }).catch((error) => {
        console.error(error)
        setTokenzCOUNT("no data")
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


 useEffect(() => { loadTokenData(); }, [])
 function loadTokenData(){  //This is local social_phrase data.
    let nn = LangData(); 
    let tgtRootARR = [], tgtStemARR=[],tgtRootSTR='';
    for(let i=0; i<nn.length;i++){ //TASK: LOOP nn, match exact, match synonym, sort by length
        tgtStemARR = nn[i].split(' ');
        tgtRootSTR = tgtStemARR[tgtStemARR.length-1];
        tgtRootARR.push(tgtRootSTR);//Save ROOT.
    }

    setRootsARR( tgtRootARR );
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
    let gameTitle = gameAGENT(token); //GAMIFICATION AGENT
    return ( <TokenFrame token={token} setMainViewStatefn={setMainViewStatefn}/> );
}

function gameAGENT(token){ //REACT to state to update game view state.
  if(!token){return ''}
  else if (token.state==='locked'){return 'X'}
  else if (token.state==='prize'){return '!'}
  else if (token.state==='clue'){return '?'}
}

let DetailView =  ( {token} ) => { 
    let exampleDetail = {key:'a13',txt:"add details",title:'a13',ctx:{}}
    let [localDetails,setLocalDetails] = useState([])

    useEffect(() => {
        if(token.details){
            setLocalDetails(token.details)
        }
        // else { console.log("details",0 )}
     }, [])

    function addLocalDetails( addTokenz){
        let newArr = [...localDetails , exampleDetail]
        // let newArr = [...localDetails , addTokenz[0]]
        // let newArr = [...localDetails , ...addTokenz]
        // let newArr = addTokenz;
        setLocalDetails(newArr)
        setSelectedDetails(newArr)
    }


    // let [tokenITEMS, setTokenITEMS] = useState([]);
    // let [itemCOUNT, setItemCOUNT] = useState("");
    // useEffect(() => { getTokenzITEMS() }, [itemCOUNT]);
    // function getDynamicTokenz(title){
    //     if(!title){ title = 'aWORDZa'}
    //     const options = {
    //         method: 'GET',
    //         // url: 'https://node-dashboard-server.vercel.app/ai2', //prod url
    //         // params: {'lookup':'tokenz'},
    //         url: `http://localhost:8008/libz/tokenz/${title}`,
    //     }
    //     axios.request(options).then((response) => {
    //         console.log(response.data.tokenz)
    //         // setTokenITEMS(response.data.tokenz)
    //         // setItemCOUNT("tokenz "+response.data.tokenz.length)
    //         debugger;
    //         addLocalDetails(response.data.tokenz)
    //         // setLocalDetails(token.details)
    //     }).catch((error) => {
    //         console.error(error)
    //         // setItemCOUNT("no data")
    //     })    
    // }

    function dynamicLink(title){
        if(!title) return;
        console.log('clicked',title)
        // getDynamicTokenz(title)
        //load page view with new selected token
    }
    function dynamicDetailDisplay(){
        return(<>

        <h1 onClick={ ()=>dynamicLink(token.title)}>{(token && token.title)?token.title:'aWORDZa'}</h1>

        {(token && token.state && token.state.txtz && token.state.txtz.length)?
            token.state.txtz[0] : 'unlocked' }
        <br></br>
        {(token && token.timestamp)?token.timestamp:'no date'}
        <br></br>
        {(token && token.txtz)?
            token.txtz.map( (item, idx)=> { //short description txt
                return (item.title==="short")?item.txtz[0]:'';
            })
            :'no short description'
        }
        <br></br>
        {(token && token.txtz)?
            token.txtz.map( (item, idx)=> { //long description txt
                return (item.title==="long")?item.txtz[0]:'';
            })
            :'no long description'
        }

        </>)
    }

    return(
    <>
        {/* <h1>add details</h1> */}
        {dynamicDetailDisplay()}
        <hr></hr>
        {/* <button onClick={ ()=>{ addLocalDetails()   }  } >details</button> */}
        {localDetails.map( (item,idx)=>{ return <div>{item.txt}</div>   } )}
    </>
    )
}

let pageViewBtnStyle = {width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue'}

function setPageViewContent(direction){
    if(direction==='up'){
        setViewState('overview')
    } else if  (direction==='right'){ //look at numz, calculate offset, apply offset, look up numz, if found load, not loop default.
        debugger;
        let tgt = '', offsetRight = 1, offsetVert = 1;
        let numz = selectedToken.numz.split('.');
        offsetRight = numz[0]++;
        if(offsetRight>= humanIDX){ offsetRight = 1; } //reset default
        if(colm && colm.length && offsetVert >= colm[offsetRight].length){ offsetRight = 1; } //reset default
        tgt = offsetRight+'.'+offsetVert;
        let nextToken = lookUpNUMZToken(tgt);
        // let newToken = {numz:tgt, id:111, txt:'hi',title:'yooooo!'}
        if(nextToken) { setSelectedToken(nextToken); } //load tgt view.
    }
}

let PageView =  ( {token} ) => { 

    return(<>
    <main className='pageview' style={{background:'skyblue',borderRadius:'6px',
        display:'flex',width:'100%',flexDirection:'column',marginRight:'1.444em'}}>
        <header style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setPageViewContent('up')}}>UP</button>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setPageViewContent('right')}}>RIGHT</button>
                {/* onClick={ ()=>{setViewState('overview')}}>RIGHT</button> */}
        </header>
        <article style={{flex:1, color:'steelblue'}}>
            {/* {(selectedToken && selectedToken.title)?selectedToken.title:'_'} */}
            <hr></hr>
            <DetailView token={selectedToken}/>
        </article>
        <footer style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setPageViewContent('overview')}}>LEFT</button>
                {/* onClick={ ()=>{setViewState('overview')}}>LEFT</button> */}
            <button style={pageViewBtnStyle} 
                onClick={ ()=>{setPageViewContent('overview')}}>DOWN</button>
                {/* onClick={ ()=>{setViewState('overview')}}>DOWN</button> */}
        </footer>
    </main>
    </>)
}


let colm = [];
let COLNUM=6; //vertical wrap limit
let tokenCOLUMNS = [];
let humanIDX = 0; //column header
function TokenGrid (){ 
    // let colm = [];
    // let COLNUM=6; //vertical wrap limit
    // let tokenCOLUMNS = [];
    // let humanIDX = 0; //column header
    for(let i=0; i<tokenzDATA.length; i += COLNUM){
        colm = tokenzDATA.slice(i,i+COLNUM);
        ++humanIDX;
         tokenCOLUMNS.push( <div style={{display:'flex',flexDirection:'column',flex:'1 1 0'}}>
            <header style={{minHeight:'2em'}}></header>
            <header>{humanIDX}</header>
            { colm.map( (token,idx)=>{ token.numz = humanIDX+'.'+idx;       //apply dynamic_numz
                return <TokenCard token={token}/>
            }) }
            <footer style={{minHeight:'3em'}}></footer>
         </div> 
         );
    }    
    return(tokenCOLUMNS)
}

function lookUpNUMZToken(tgt){
    debugger;
    console.log("test3",colm.length)
}

function setMainViewStatefn(selection,token){ //update app, show view
    setViewState(selection);
    setSelectedToken(token);
}

function setSelectedDetails(newDetails){
    let newObj = selectedToken
    newObj.details = newDetails
    setSelectedToken(newObj);
}

let btnCardStyle = { background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
alignContent:'flex-end',alignItems:'stretch',height:'10em',flex:'1',minWidth:'6em',
flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly' }

return (
    < >
    <h1>aWORDaGAME</h1>
    {/* <h1>StoryTree</h1> */}
    {/* <ReactMarkdown>
            {markdownDATA}
        </ReactMarkdown> */}
<main className='scrollBarH' style={{overflowY:'auto'}}>
    <section className='mainframe scrollBarV' style={{display:'flex',
    boxShadow:'0px 1px 14px 1px purple',paddingBottom:'3em',
    marginTop:'0.444em',paddingLeft:'1.444em',paddingRight:'1.444em',flex:1,
    marginRight:'1em',marginLeft:'1em'} }>
        { (viewState==='overview') ?
            <TokenGrid/>
        : (viewState==='pageview') ?
           <PageView token={selectedToken}/>
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
          WORD_GAME TOKENZ". {tokenzCOUNT}
        </footer>
    </>
)

};