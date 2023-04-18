import Zoom from 'react-reveal/Zoom';
import NeuralNet from './NeuralNet'
// import TallySound from '../sonic/nxTally0d.mp3'
import { useState,useEffect } from 'react';

//ai DESIGN PATTERNS:
//1 influence many data types.
//2 ALGORITHM - add METADATA to DATA and load STATE(MACHINE).
//3 FALSE answer replacment.
//4 STYLE as METADATA because STYLE represents STATE.
//5 MASK the data from the human...
//6 USER INPUT check TXT ANSWER vs STATE.
// import initSound from './sonic/nxSonar1d.mp3'
export default function AWordaGami1(){ //first letter needs to be capital to have class.

    //:ai: 1 MANY DIFFERENT DATA TYPES to influence. In this case: TXT = 'text' data.  
    let [gameIDX, setGameIDX] = useState(0);
    let [rightCOUNT, setRightCOUNT] = useState(0);
    let [wrongCOUNT, setWrongCOUNT] = useState(0);
    let [totalSCORE, setTotalScore] = useState(0);
    let [nextGame, setNextGame] = useState(false);
    let [aPhraseARR, setPhraseARR] = useState([]);
    let [solutionARR, setSolutionARR] = useState([]);
    let [aPhraseTXT, setPhraseTXT] = useState("");
    let [cursorIDX, setCursorIDX] = useState(0);

    useEffect(() => {
        // var initSOUND = new Audio(initSound);
        var initSOUND = new Audio("./sonic/nxSonar1d.mp3");
        initSOUND.play();
        setGameIDX(gameIDX+1)
        initGame();
      },[]);

    function getPromptView(){
        let promptARR = aPhraseTXT.split(' ');
        let stateARR = promptARR.map( (txt,idx) => { //:ai: 2. ALGORITHM - add METADATA to DATA and load STATE(MACHINE).
            function btnClick ( e ) { solvePuzzle(e.target.innerText)}
            return <button onClick={btnClick} style={promptStyle} className={ getPromptBtnCLASSName(txt,idx) }  >
                {txt}
            </button>
        });
        let shuffledPrompts = stateARR.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        return shuffledPrompts;
    }

    function getPhraseView(){
        let phraseARR = aPhraseTXT.split(' ');
        return phraseARR.map( (txt,idx) => { // :ai: 5. MASK the data from the human.
            const maskTXTARR =  txt.split('').map( (letter,i) => {
                if(solutionARR[idx] && solutionARR[idx] === txt) { return letter; }
                return '_ ' 
            })
            return <div style={txtAnswerStyle} className={ getPhraseWordCLASSName(txt,idx) }>
                {maskTXTARR.join('')}</div>
        });
    }

    //:ai: 4: STYLE as METADATA - STYLE represents STATE.
    function getPromptBtnCLASSName (txt,idx) {
        if(solutionARR[idx] && solutionARR[idx] === txt){ return 'promptSELECTED';  }
    }

    function getPhraseWordCLASSName (txt,idx) {
        if(solutionARR[idx] && solutionARR[idx] === txt){
            return 'wordCORRECT';
        } else if(solutionARR[idx] && solutionARR[idx] != txt) { //WRONG
            return 'wordWRONG';
        } else if (cursorIDX===idx){
            return 'wordCURSOR';
        }
        return ''
    }

    let promptStyle = {
        background: '#6facf7', border: '1px solid #444', lineHeight: '34px', textAlign: 'center',
        width: '10%', margin: '0.5em', borderRadius: '13px', boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer', fontFamily: 'fangsong', color: '#013434', textShadow: '-1px 0px 1px whitesmoke',
        width:'90%',userSelect:'none',fontSize:'large',fontFamily:'monospace'     
    }

    let txtAnswerStyle = {
        background:'floralwhite',border:'1px solid #444',lineHeight:'34px',padding:'1em',textAlign:'center',
        height:'66px',margin:'0.5em',borderRadius:'13px',fontFamily:'fangsong',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',userSelect:'none',cursor:'no-drop',
        boxShadow:'darkslategrey 0px 0px 8px 1px inset'// ,boxShadow:'red 0px 0px 8px 1px inset'// ,boxShadow:'lime 0px 0px 8px 1px inset'
    } 

    function calculateScore(){
        let scorePCT = 0;
        if (wrongCOUNT >= rightCOUNT){ return 0;}
        if (!wrongCOUNT){scorePCT = 100}
        else if (rightCOUNT){ scorePCT = ( 1 - ( wrongCOUNT / rightCOUNT) ) * 100; }
        scorePCT = Math.floor(scorePCT).toFixed(0); //trim remainder-.
        return scorePCT + '%';
    }

    function solvePuzzle(guess){ //:ai: 6 on user input check each TXT ANSWER against STATE.
        if (nextGame){return}
        if (guess === aPhraseARR[cursorIDX]){ // CORRECT GUESS
            correctGuess(guess);
        } else { //INCORRECT GUESS
            wrongGuess(guess);
        }
    }

    function correctGuess(guess){
        console.log('Correct.');
        let tempARR = solutionARR;
        tempARR[cursorIDX] = guess; //ai 3 overwrite wrong answers.
        setSolutionARR(tempARR);
        setRightCOUNT(rightCOUNT+1);
        setCursorIDX(cursorIDX+1);
        if(solutionARR.join('') === aPhraseARR.join('')){  //END GAME.
            console.log('WIN!');
            setNextGame(true);
            var windSOUND = new Audio("./sonic/nxWin1a.mp3");
            windSOUND.play();            
        } else { // Correct
            var tallySOUND = new Audio("./sonic/nxBlip2b.mp3");
            tallySOUND.play()
             .then(() => {/*Audio playing*/}).catch(error => {console.log(error); });
        }
    }

    function wrongGuess(guess){
        console.log('Wrong.');
        var wrongSOUND = new Audio("./sonic/nxTally0d.mp3");
        wrongSOUND.play();
        let tempARR = solutionARR;
        tempARR[cursorIDX] = guess; //ai 3 overwrite wrong answers.
        setSolutionARR(tempARR);
        setWrongCOUNT(wrongCOUNT+1);
    }

    async function nextGameCLICK(){
        await setGameIDX(gameIDX+1)
        let nn = NeuralNet();
        if( gameIDX === nn.length){ //ENDGAME. TODO: NEW RANDOM PUZZLESET
            var resetSOUND = new Audio("./sonic/nxBoop3.mp3");
            resetSOUND.play();
            initGame();
        }else{
            var nextSOUND = new Audio("./sonic/nxWoop1.mp3");
            nextSOUND.play();
            initGame();
        }
    }

    function initGame(){ //RESET-STATE
        setCursorIDX(0);
        setNextGame(false);
        setSolutionARR([]);  
        //RELOAD-NEXT-GAME-.
        let nn = NeuralNet(); //todo nn.puzzleset
        let nextPhraseTXT = '';
        if(gameIDX >= nn.length){ //ENDGAME. TODO: NEW RANDOM PUZZLESET
            console.log('RESETGAME 1')
            setGameIDX(1);
            nextPhraseTXT = nn[0];          
        } else {
            nextPhraseTXT = nn[gameIDX];
        }
        setPhraseTXT(nextPhraseTXT);
        let nextPhraseARR = nextPhraseTXT.split(' ');
        setPhraseARR(nextPhraseARR); //TODO - optimization, replace Phrase TXT? rename aPhraseARR
    }
    return (
        <>
            <h1 style={{display:'flex',justifyContent:'center'}}><Zoom>ai Word Game &nbsp; {gameIDX}</Zoom></h1>
            <gameframe style={{display:'flex',alignItems:'flex-start',minHeight:'466px',
                borderTop:'2px solid purple',borderRadius:'13px',margin:'1em 3% 0px',padding:'2%'}}>
                <aside style={{width:'25%',paddingTop:'1em'}}>
                    <h2 style={{marginRight:'1em'}}>
                        choices:</h2>
                <section style={{border:'1px solid skyblue',borderRadius:'8px',marginRight:'2%',
                        padding:'0.8em',overflowX:'hidden',overflowY:'auto',height:'355px'}}>
                    { getPromptView() }
                </section>
                </aside>
                <aside style={{height:'370px',width:'75%',paddingTop:'1em'}}>
                    <h2>common phrase:</h2>
                    <section style={{border:'1px solid steelblue',borderRadius:'8px',display:'flex',flexDirection:'column',height:'100%',padding:'0.444em'}}>
                        <gameboard style={{borderBottom:'1px solid darkslategray',borderRadius:'8px',
                            display:'flex',flexDirection:'row',alignContent:'center',minHeight:'300px',
                            justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                            { getPhraseView() }
                        </gameboard>
                        <article style={{padding:'0.666em',color:'darkslategray'}}>
                            <aside style={{display:'flex',justifyContent:'space-around',color:'steelblue'
                                ,fontFamily:'sans-serif'}}>
                                <div style={{ color:'#197c19'}}>right: {rightCOUNT}</div>
                                <div style={{ color:'#a62626'}}>wrong: {wrongCOUNT}</div>
                                {/* <div style={{ color:'steelblue'}}>score: {totalSCORE}</div> */}
                                <div style={{ color:'steelblue'}}>score: {calculateScore()}</div>
                            </aside>
                         </article>
                    </section>
                </aside>
            </gameframe>
            <footer style={{color:'darkcyan',fontSize:'small',paddingBottom:'1em',fontFamily:'sans-serif'}}>
                { 
                    (!nextGame)? <>click a word, to solve the puzzle</>: 
                        <button style={{borderRadius:'8px',padding:'1em',background:'darkseagreen',
                            boxShadow:'0px -1px 5px 1px gold', cursor:'pointer',userSelect:'none' }}
                            onClick={nextGameCLICK}>NEXT GAME </button>
                }
            </footer>
        </>
    )
}