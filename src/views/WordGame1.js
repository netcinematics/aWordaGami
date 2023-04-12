export default function WordGame1(){

    //ai 1: MANY DIFFERENT DATA TYPES. In this case: TXT = 'text' data.
    let phraseTXT = "fill in the blank"
    let phraseARR = phraseTXT.split(' ');
    let promptTXT = "other words same size to magic brain" + " " + phraseTXT; 
    let promptARR = promptTXT.split(' ').reverse();

    //ai 4: STYLE as METADATA because STYLE represents STATE.
    let promptStyle = {
        background: '#6facf7', border: '1px solid #444', lineHeight: '34px', padding: '1em', textAlign: 'center',
        width: '10%', margin: '0.5em', borderRadius: '13px', boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer', fontFamily: 'fangsong', color: '#013434', textShadow: '-1px 0px 1px whitesmoke',
        width:'90%',height:'66px',userSelect:'none','&:hover':{background: "#efefef"}       
    }

    let txtAnswerStyle = {
        background:'floralwhite',border:'1px solid #444',lineHeight:'34px',padding:'1em',textAlign:'center',
        height:'66px',margin:'0.5em',borderRadius:'13px',fontFamily:'fangsong',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',userSelect:'none',cursor:'no-drop',
        boxShadow:'darkslategrey 0px 0px 8px 1px inset'
        // ,boxShadow:'red 0px 0px 8px 1px inset'
        // ,boxShadow:'lime 0px 0px 8px 1px inset'
    }

    let gameFrameStyle = {
        display:'flex',alignItems:'flex-start',
        borderTop:'2px solid purple',borderRadius:'13px',margin:'1em',padding:'1em'  }

    
    const PromptView = promptARR.map( txt => { //ai 2. ALGORITHM - ADD METADATA to DATA and load STATE(MACHINE).
        function btnClick ( e ) { solvePuzzle(e.target.innerText)}
        return <button onClick={btnClick} style={promptStyle}  >
            {txt}
        </button>
    }); 

    const GameView = phraseARR.map(txt => { // ai 5. MASK the data from the human.
        const maskTXT =  txt.split('').map( letter => '_ ' ).join('');
       return <div style={txtAnswerStyle}>{maskTXT}</div>
    });

    function solvePuzzle(guess){
        
    }

    return (
        <>
            <h1>ai Word Game 1</h1>
            <gameframe style={gameFrameStyle}>

                <aside style={{width:'25%',paddingTop:'1em'}}>
                    <h2>Choices:</h2>
                <section style={{maxHeight:'355px',overflowY:'scroll',border:'1px solid skyblue',borderRadius:'8px'}}>
                    {PromptView}
                </section>
                </aside>
                <aside style={{height:'370px',width:'75%',paddingTop:'1em',marginLeft:'2em'}}>
                    <h2>Common Phrase:</h2>
                    <section style={{border:'1px solid steelblue',borderRadius:'8px',display:'flex',flexDirection:'column',height:'100%',padding:'0.444em'}}>
                        <gameboard style={{borderBottom:'1px solid darkslategray',borderRadius:'8px',
                        display:'flex',flexDirection:'row',alignContent:'center',minHeight:'300px',
                        justifyContent:'center',alignItems:'center'}}>
                            {GameView}
                        </gameboard>
                        <article style={{padding:'0.666em',color:'darkslategray'}}>
                         click a word to solve the puzzle.
                         </article>
                    </section>
                </aside>
            </gameframe>
        </>
    )
}