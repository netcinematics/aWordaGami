import React from 'react';
import { useState, useEffect } from 'react';

function TokenFrame ( { token, setMainViewStatefn } ) {
    useEffect(() => { document.title = "aGood_a_Storya";  }, []);

    let [isHovered, setHovered] = useState(false);

    let handleMouseEnter = () => {
        setHovered(true)
    }
    let handleMouseLeave = () => {
        setHovered(false)
    }

    function onTokenClick(  ){ 
        setMainViewStatefn("pageview",token);
    }

    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
        alignContent:'flex-end',alignItems:'stretch',height:'10em',width:'95%',
        flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly'
    } 

    function gameAGENT(token){ //REACT to state and RESPOND
        if(!token){return ''}
        else if (token.state==='locked'){return 'X'}
        else if (token.state==='prize'){return '!'}
        else if (token.state==='clue'){return '?'}
    }
    let gameTitle = gameAGENT(token); 
    let dynamicFontColor = (token.state==='prize')?'mediumpurple':(token.state==='clue')
    ?'#d08701':(token.state==='locked')?'#de6666':'steelblue';
    //-----------------TOKEN---------------
    return (<>
        {/* <h2>StoryFrame</h2> */}
        <button className={isHovered ? 'btnHover' : 'x'} style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onTokenClick}>
            { (token.state)?
                <section style={{background:'lightskyblue',flex:'1',borderTopLeftRadius:'13px',
                    borderTopRightRadius:'13px',display:'flex',justifyContent:'center',
                    color:dynamicFontColor,
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
    </>)

}

export default TokenFrame;