import Zoom from 'react-reveal/Zoom';
import NeuralNet from './NeuralNet'
import { useState,useEffect } from 'react';

//ai DESIGN PATTERNS:
//1
//2
//3
//4
//5
//6
//7

export default function AWordaGami1(){ //first letter needs to be capital to have class.

    //ai 1: MANY DIFFERENT DATA TYPES to influence. In this case: TXT = 'text' data.  
    let [gameIDX, setGameIDX] = useState(0);
    let [rightCOUNT, setRightCOUNT] = useState(0);
    let [wrongCOUNT, setWrongCOUNT] = useState(0);
    let [totalSCORE, setTotalScore] = useState(0);
    let [nextGame, setNextGame] = useState(false);
    let [aPhraseARR, setPhraseARR] = useState([]);
    let [solutionARR, setSolutionARR] = useState([]);
    let [aPhraseTXT, setPhraseTXT] = useState("");

    useEffect(() => {
        setGameIDX(gameIDX+1)
        initGame();
      },[]);


    function getPromptView(){
        let promptARR = aPhraseTXT.split(' ').reverse();
        let shuffledPrompts = promptARR
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        const PromptView2 = shuffledPrompts.map( txt => { //ai 2. ALGORITHM - ADD METADATA to DATA and load STATE(MACHINE).
            function btnClick ( e ) { solvePuzzle(e.target.innerText)}
            return <button onClick={btnClick} style={promptStyle}  >
                {txt}
            </button>
        }); 
        return PromptView2;
    }

    function getPhraseView(){
        let phraseARR = aPhraseTXT.split(' ');
        const GameView2 = phraseARR.map( (txt,idx) => { // ai 5. MASK the data from the human.
            const maskTXTARR =  txt.split('').map( (letter,i) => {
                if(idx<solutionARR.length){ return letter; }
                return '_ ' 
            })
            return <div style={txtAnswerStyle}>{maskTXTARR.join('')}</div>
        });
        return GameView2 
    }

    //ai 4: STYLE as METADATA because STYLE represents STATE.
    let promptStyle = {
        background: '#6facf7', border: '1px solid #444', lineHeight: '34px', textAlign: 'center',
        width: '10%', margin: '0.5em', borderRadius: '13px', boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer', fontFamily: 'fangsong', color: '#013434', textShadow: '-1px 0px 1px whitesmoke',
        width:'90%',userSelect:'none',fontSize:'large'     
    }

    let txtAnswerStyle = {
        background:'floralwhite',border:'1px solid #444',lineHeight:'34px',padding:'1em',textAlign:'center',
        height:'66px',margin:'0.5em',borderRadius:'13px',fontFamily:'fangsong',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',userSelect:'none',cursor:'no-drop',
        boxShadow:'darkslategrey 0px 0px 8px 1px inset'// ,boxShadow:'red 0px 0px 8px 1px inset'// ,boxShadow:'lime 0px 0px 8px 1px inset'
    }

    let gameFrameStyle = {
        display:'flex',alignItems:'flex-start',minHeight:'466px',
        borderTop:'2px solid purple',borderRadius:'13px',margin:'1em',marginBottom:0,padding:'1em'  }

    function calculateScore(){
        const nextSCORE = ((rightCOUNT-wrongCOUNT<0)?0:(rightCOUNT-wrongCOUNT)) / aPhraseARR.length
        setTotalScore(totalSCORE+nextSCORE);
    }

    function solvePuzzle(guess){
        //AI 7 on user input check each TXT ANSWER against STATE.
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
            tallySOUND.play();
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
        console.log('IDXTEST-PRE',gameIDX)
        await setGameIDX(gameIDX+1)
        let nn = NeuralNet();
        console.log('IDXTEST-NEXT',gameIDX, nn.length)
        if( gameIDX === nn.length){ //ENDGAME. TODO: NEW RANDOM PUZZLESET
            var resetSOUND = new Audio("./sonic/nxBoop3.mp3");
            resetSOUND.play();
            // await setGameIDX(1);
            initGame();
        }else{
            var nextSOUND = new Audio("./sonic/nxWoop1.mp3");
            nextSOUND.play();
            // await setGameIDX(gameIDX+1)
            initGame();
        }
    }

    function initGame(){
        //RESET-STATE
        setRightCOUNT(0);
        setWrongCOUNT(0);
        setNextGame(false);
        setSolutionARR([]);  
        //RELOAD-NEXT-GAME-.
        let nn = NeuralNet(); //todo nn.puzzleset
        console.log('IDXTEST-INIT',gameIDX, nn.length)
        let nextPhraseTXT = '';
        if(gameIDX >= nn.length){ //ENDGAME. TODO: NEW RANDOM PUZZLESET
            console.log('RESETGAME 0')
            setGameIDX(0);
            nextPhraseTXT = nn[0];          
        } else {
            nextPhraseTXT = nn[gameIDX];
        }
        // let nextPhraseTXT = nn[gameIDX];
        setPhraseTXT(nextPhraseTXT);
        let nextPhraseARR = nextPhraseTXT.split(' ');
        setPhraseARR(nextPhraseARR); //TODO
    }


    return (
        <>
            <h1 style={{display:'flex',justifyContent:'center'}}><Zoom>ai Word Game &nbsp; {gameIDX}</Zoom></h1>
            <gameframe style={gameFrameStyle}>

                <aside style={{width:'25%',paddingTop:'1em'}}>
                    <h2>Choices:</h2>
                <section style={{border:'1px solid skyblue',borderRadius:'8px',
                        padding:'1em',overflowX:'hidden',overflowY:'auto',height:'355px'}}>
                    { getPromptView() }
                </section>
                </aside>
                <aside style={{height:'370px',width:'75%',paddingTop:'1em',marginLeft:'2em'}}>
                    <h2>Common Phrase:</h2>
                    <section style={{border:'1px solid steelblue',borderRadius:'8px',display:'flex',flexDirection:'column',height:'100%',padding:'0.444em'}}>
                        <gameboard style={{borderBottom:'1px solid darkslategray',borderRadius:'8px',
                            display:'flex',flexDirection:'row',alignContent:'center',minHeight:'300px',
                            justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                            { getPhraseView() }
                        </gameboard>
                        <article style={{padding:'0.666em',color:'darkslategray'}}>
                            <aside style={{display:'flex',justifyContent:'space-around',color:'steelblue'}}>
                                <div>right: {rightCOUNT}</div>
                                <div>wrong: {wrongCOUNT}</div>
                                <div>score: {totalSCORE}</div>
                            </aside>
                         </article>
                    </section>
                </aside>
            </gameframe>
            <footer style={{color:'darkcyan',fontSize:'small',paddingBottom:'1em'}}>
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