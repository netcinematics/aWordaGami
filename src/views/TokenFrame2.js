// import React, { Component } from 'react';
import React from 'react';
import { useState, useEffect } from 'react';

function TokenFrame ( { token } ) {
    // console.log("param",token)
    // useEffect(() => { document.title = "Good_Ai";  }, []);
    // useEffect(() => {  }, []);

    let [isHovered, setHovered] = useState(false);

    let handleMouseEnter = () => {
        setHovered(true)
    }
    let handleMouseLeave = () => {
        setHovered(false)
    }

    function onTokenClick(  ){ 
        console.log('A',token.numz);
        // setViewState("pageview");
    }

    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
        alignContent:'flex-end',alignItems:'stretch',height:'10em',width:'95%',
        flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly'
    } 

    return (<>
        <h2>StoryFrame</h2>
        <h3>{token.numz}</h3>
        <h4> {token.title}</h4>

        <button className={isHovered ? 'btnHover' : 'x'} style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onTokenClick}
        ></button>
    </>)

}

export default TokenFrame;