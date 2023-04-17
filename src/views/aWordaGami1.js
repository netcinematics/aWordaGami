import Zoom from 'react-reveal/Zoom';
import NeuralNet from './NeuralNet'
import { useState,useEffect } from 'react';

//ai DESIGN PATTERNS:
//1 influence many data types.
//2 ALGORITHM - add METADATA to DATA and load STATE(MACHINE).
//3
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

    useEffect(() => {
        // var initSOUND = new Audio(initSound);
        var initSOUND = new Audio("./sonic/nxSonar1d.mp3");
        initSOUND.play();
        setGameIDX(gameIDX+1)
        initGame();
      },[]);

    function getPromptView(){
        let promptARR = aPhraseTXT.split(' ').reverse();
        let shuffledPrompts = promptARR.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        
        // const PromptView2 = 
        return shuffledPrompts.map( txt => { //:ai: 2. ALGORITHM - add METADATA to DATA and load STATE(MACHINE).
            function btnClick ( e ) { solvePuzzle(e.target.innerText)}
            return <button onClick={btnClick} style={promptStyle} className={ getPromptBtnCLASSName(txt) }  >
                {txt}
            </button>
        }); 
        // return PromptView2;
    }

    function getPhraseView(){
        let phraseARR = aPhraseTXT.split(' ');
        // const GameView2 = 
        return phraseARR.map( (txt,idx) => { // :ai: 5. MASK the data from the human.
            const maskTXTARR =  txt.split('').map( (letter,i) => {
                if(idx<solutionARR.length){ return letter; }
                return '_ ' 
            })
            return <div style={txtAnswerStyle} className={ getPhraseWordCLASSName(txt) }>
                {maskTXTARR.join('')}</div>
        });
        // return GameView2 
    }

    //:ai: 4: STYLE as METADATA - STYLE represents STATE.
    function getPromptBtnCLASSName (txt) {
        if(solutionARR.includes(txt)){
            return 'promptSELECTED'; 
        }
    }

    function getPhraseWordCLASSName (txt) {
        if(solutionARR.includes(txt)){
            return 'wordCORRECT';
        } else { //WRONG

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
        const nextSCORE = ((rightCOUNT-wrongCOUNT<0)?0:(rightCOUNT-wrongCOUNT)) / aPhraseARR.length
        setTotalScore(totalSCORE+nextSCORE);
    }

    function solvePuzzle(guess){ //:ai: 6 on user input check each TXT ANSWER against STATE.
        if(solutionARR.length < aPhraseARR.length && guess){ //Not last GUESS
            if (guess=== aPhraseARR[solutionARR.length]){ // CORRECT GUESS
                correctGuess(guess);
            } else { //INCORRECT GUESS
                wrongGuess(guess);
            }
        }
    }

    async function correctGuess(guess){
        console.log('Correct.');
        setRightCOUNT(rightCOUNT+1);
        await setSolutionARR([ ...solutionARR , guess ] );
        calculateScore();
        if(solutionARR.length+1 === aPhraseARR.length){
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
        var wrongSOUND = new Audio("./sonic/nxBoop3.mp3");
        wrongSOUND.play();
        console.log('Wrong.');
        setWrongCOUNT(wrongCOUNT+1);
        calculateScore();
    }

    async function nextGameCLICK(){
        await setGameIDX(gameIDX+1)
        let nn = NeuralNet();
        if( gameIDX === nn.length){ //ENDGAME. TODO: NEW RANDOM PUZZLESET
            var resetSOUND = new Audio("./sonic/nxTally0d.mp3");
            resetSOUND.play();
            initGame();
        }else{
            var nextSOUND = new Audio("./sonic/nxWoop1.mp3");
            nextSOUND.play();
            initGame();
        }
    }

    function initGame(){ //RESET-STATE
        setRightCOUNT(0);
        setWrongCOUNT(0);
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
        setPhraseARR(nextPhraseARR); //TODO
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
                                <div>right: {rightCOUNT}</div>
                                <div>wrong: {wrongCOUNT}</div>
                                <div>score: {totalSCORE}</div>
                            </aside>
                         </article>
                    </section>
                </aside>
            </gameframe>
            <footer style={{color:'darkcyan',fontSize:'small',paddingBottom:'1em',fontFamily:'sans-serif'}}>
                { 
                    (!nextGame)? <>click a word, to solve the puzzle 
                    {/* <button onClick={initGame}>start</button> */}
                    </>: 
                        <button style={{borderRadius:'8px',padding:'1em',background:'darkseagreen',
                            boxShadow:'0px -1px 5px 1px gold', cursor:'pointer' }}
                            onClick={nextGameCLICK}>NEXT GAME </button>
                }
            </footer>
        </>
    )
}