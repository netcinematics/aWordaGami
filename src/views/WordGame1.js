export default function WordGame1(){

    let phraseTXT = "fill in the blank"
    let phraseARR = phraseTXT.split(' ');
    let promptTXT = "other words same size to magic brain" + " " + phraseTXT; 
    let promptARR = promptTXT.split(' ').reverse();

    let promptStyle = {
        background: '#6facf7',
        border: '1px solid #444',
        lineHeight: '34px',
        padding: '1em',
        textAlign: 'center',
        width: '10%',
        margin: '0.5em',
        borderRadius: '13px',
        boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer',
        fontFamily: 'fangsong',
        color: '#013434',
        textShadow: '-1px 0px 1px whitesmoke'        
    }

    let txtboxStyle = {
        background: '#6facf7',
        border: '1px solid #444',
        lineHeight: '34px',
        padding: '1em',
        textAlign: 'center',
        width: '10%',
        margin: '0.5em',
        borderRadius: '13px',
        boxShadow: 'inset 1px 1px 5px 0px blue',
        cursor: 'pointer',
        fontFamily: 'fangsong',
        color: '#013434',
        textShadow: '-1px 0px 1px whitesmoke'        
    }

    let gameFrameStyle = {
        display:'flex',alignItems:'flex-start',justifyContent:'center',    
        borderTop:'2px solid purple',borderRadius:'13px',margin:'1em',padding:'1em'  }

    const PromptView = promptARR.map( item =>
        <section style={promptStyle}>{item}</section>
    );
    const GameView = phraseARR.map(item =>
        <section style={txtboxStyle}>{item}</section>
    // <li key={item.id}>
    //     {item.title}
    // </li>
    );

    return (
        <>
            <h1>a Word Game 1</h1>
            <gameframe style={gameFrameStyle}>

                <aside>
                <h2>GamePrompt:</h2>
                    {PromptView}
                </aside>
                {GameView}
            </gameframe>
        </>
    )
}