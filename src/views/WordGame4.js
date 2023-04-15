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

export default function WordGame4(){

    //ai 1: MANY DIFFERENT DATA TYPES. In this case: TXT = 'text' data.
    // let puzzleSet1 = ["all the rage","last one there is a rotten egg","good to go"];
    // let phraseTXT = "good to go" //'celebrate each other' 'raise all boats'
    // let phraseARR = phraseTXT.split(' ');
    // let promptTXT = phraseTXT; 
    // let promptARR = promptTXT.split(' ').reverse();

    
    let [gameIDX, setGameIDX] = useState(0);
    let [rightCOUNT, setRightCOUNT] = useState(0);
    let [wrongCOUNT, setWrongCOUNT] = useState(0);
    let [totalSCORE, setTotalScore] = useState(0);
    let [nextGame, setNextGame] = useState(false);
    let [aPhraseARR, setPhraseARR] = useState([]);
    let [solutionARR, setSolutionARR] = useState([]);
    let [aPromptView, setPromptView] = useState(null);
    let [aPhraseView, setPhraseView] = useState(null);

    let [aPhraseTXT, setPhraseTXT] = useState("");
    let [testSTR, setTestSTR] = useState("BEGIN");

    useEffect(() => {
    //     initGame();

         setTestSTR('FX')
      },[]);


    function getPromptView(){
        // console.log("ATEST6",testSTR);
        console.log("TESTLEN SCOP2332",aPhraseTXT) //must exist for scope.
        let promptARR = aPhraseTXT.split(' ').reverse();
        const PromptView2 = promptARR.map( txt => { //ai 2. ALGORITHM - ADD METADATA to DATA and load STATE(MACHINE).
            function btnClick ( e ) { solvePuzzle(e.target.innerText)}
            return <button onClick={btnClick} style={promptStyle}  >
            {/* return <button onClick={solvePuzzle()} style={promptStyle}  > */}
                    {txt}
                </button>
        }); 

        return PromptView2;
    }

    // function loadPromptView (promptARR){
    //     console.log("ATEST22",testSTR);
    //     console.log("TESTLEN SCOP",aPhraseARR.length) //must exist for scope.
    //     console.log("TESTLEN SCOP",solutionARR.length)
    //     const PromptView2 = promptARR.map( txt => { //ai 2. ALGORITHM - ADD METADATA to DATA and load STATE(MACHINE).
    //         function btnClick ( e ) { solvePuzzle(e.target.innerText)}
    //         return <button onClick={btnClick} style={promptStyle}  >
    //         {/* return <button onClick={solvePuzzle()} style={promptStyle}  > */}
    //                 {txt}
    //             </button>
    //     }); 
    //     setPromptView(PromptView2)
    // }

    // function loadPhraseView(phraseARR){

    //     const GameView2 = phraseARR.map( (txt,idx) => { // ai 5. MASK the data from the human.
    //         const maskTXTARR =  txt.split('').map( (letter,i) => {
    //             if(idx<solutionARR.length){ return letter; }
    //             return '_ ' 
    //         })
    //         return <div style={txtAnswerStyle}>{maskTXTARR.join('')}</div>
    //     });

    //     setPhraseView(GameView2)
    // }

    function getPhraseView(){
        // console.log("ATEST333",testSTR);
        console.log("TESTLEN SCOP",aPhraseTXT) //must exist for scope.
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







        //todo remove
    // let PromptView = promptARR.map( txt => { //ai 2. ALGORITHM - ADD METADATA to DATA and load STATE(MACHINE).
    //     function btnClick ( e ) { solvePuzzle(e.target.innerText)}
    //     return <button onClick={btnClick} style={promptStyle}  >
    //             {txt}
    //         </button>
    // }); 

    // const GameView = phraseARR.map( (txt,idx) => { // ai 5. MASK the data from the human.
    //     const maskTXTARR =  txt.split('').map( (letter,i) => {
    //         if(idx<solutionARR.length){ return letter; }
    //         return '_ ' 
    //     })
    //     return <div style={txtAnswerStyle}>{maskTXTARR.join('')}</div>
    // });

    function calculateScore(){
        // if(!rightCOUNT){return 0}
        const nextSCORE = ((rightCOUNT-wrongCOUNT<0)?0:(rightCOUNT-wrongCOUNT)) / aPhraseARR.length
        setTotalScore(totalSCORE+nextSCORE);
    }

    function solvePuzzle(guess){
        // console.log("ATEST3",testSTR);
        console.log("TESTLENaaaA",aPhraseTXT)
        console.log("TESTLENbbbB",solutionARR.length)
        console.log("TESTLENcccc", aPhraseARR.length)
        //AI 7 on user input check each TXT ANSWER against STATE.
        // if(solutionARR.length < phraseARR.length && guess){ //Not last GUESS
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
        // console.log('SOLLUTIONb4',solutionARR.length)
        await setSolutionARR([ ...solutionARR , guess ] );
        // console.log('SOLLUTIONafter',solutionARR.length)
        calculateScore();
        console.log(solutionARR.length, aPhraseARR.length);
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
        var nextSOUND = new Audio("./sonic/nxWoop1.mp3");
        nextSOUND.play();
        await setGameIDX(gameIDX+1)
        initGame();
    }

    function initGame(){
        // setTestSTR('INIT')
        //RESET-STATE
        setRightCOUNT(0);
        setWrongCOUNT(0);
        setNextGame(false);
        setSolutionARR([]);  
        //RELOAD-NEXT-GAME-.
        let nn = NeuralNet(); //todo nn.puzzleset
        let nextPhraseTXT = nn[gameIDX];
        setPhraseTXT(nextPhraseTXT);
        setTestSTR(nextPhraseTXT);
        // console.log("ATEST1",aPhraseTXT);
        let nextPhraseARR = nextPhraseTXT.split(' ');

        setPhraseARR(nextPhraseARR);
        // await setPhraseARR([ ...nextPhraseARR] );
        // setPhraseARR( nextPhraseARR => [ ...nextPhraseARR] );
        // setSearches(searches => [...searches, query])
        // console.log("TEST1",aPhraseARR.length)
        //INIT PROMPT and PHRASE VIEWS
        // loadPromptView(nextPhraseARR);
        // loadPhraseView(nextPhraseARR);


    }


    return (
        <>
            <h1 style={{display:'flex',justifyContent:'center'}}><Zoom>ai Word Game &nbsp; {gameIDX+1}</Zoom></h1>
            <gameframe style={gameFrameStyle}>

                <aside style={{width:'25%',paddingTop:'1em'}}>
                    <h2>Choices:</h2>
                <section style={{border:'1px solid skyblue',borderRadius:'8px',
                        padding:'1em',overflowX:'hidden',overflowY:'auto',height:'355px'}}>
                    {/* {PromptView} */}
                    {/* {aPromptView} */}
                    { getPromptView() }
                </section>
                </aside>
                <aside style={{height:'370px',width:'75%',paddingTop:'1em',marginLeft:'2em'}}>
                    <h2>Common Phrase:</h2>
                    <section style={{border:'1px solid steelblue',borderRadius:'8px',display:'flex',flexDirection:'column',height:'100%',padding:'0.444em'}}>
                        <gameboard style={{borderBottom:'1px solid darkslategray',borderRadius:'8px',
                            display:'flex',flexDirection:'row',alignContent:'center',minHeight:'300px',
                            justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                            {/* {GameView} */}
                            {/* {aPhraseView} */}
                            { getPhraseView() }
                        </gameboard>
                        <article style={{padding:'0.666em',color:'darkslategray'}}>
                            <aside style={{display:'flex',justifyContent:'space-around',color:'steelblue'}}>
                                <div>right: {rightCOUNT}</div>
                                <div>wrong: {wrongCOUNT}</div>
                                <div>score: {totalSCORE}</div>
                                <div>test: {testSTR}</div>
                                {/* <div>score: {((rightCOUNT-wrongCOUNT<0)?0:(rightCOUNT-wrongCOUNT)) / phraseARR.length}</div> */}
                            </aside>
                         </article>
                    </section>
                </aside>
            </gameframe>
            <footer style={{color:'darkcyan',fontSize:'small',paddingBottom:'1em'}}>
                { 
                    (!nextGame)? <>click a word, to solve the puzzle 
                    <button onClick={initGame}>start</button>
                    </>: 
                        <button style={{borderRadius:'8px',padding:'1em',background:'darkseagreen',
                            boxShadow:'0px -1px 5px 1px gold', cursor:'pointer' }}
                            onClick={nextGameCLICK}>NEXT GAME </button>
                }
            </footer>
        </>
    )
}