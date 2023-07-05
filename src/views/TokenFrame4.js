import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

function TokenFrame ( { token, setTokenViewfn } ) {
    // console.log("tokenFrame",token.title)
    useEffect(() => { document.title = token.title;  }, []);
    // useEffect(() => { document.title = "ai_tree";  }, []);
    // console.log("LOAD TOKENFRAME ITEMS", token.title)
    let [tokenITEMS, setTokenITEMS] = useState([]);
    let [itemCOUNT, setItemCOUNT] = useState("");
    // useEffect(() => { getTokenITEMS() }, [itemCOUNT]);
    // function getTokenITEMS(param){
    //     if(!param){ param = 'aWORDZa'}
    //     const options = {
    //         method: 'GET',
    //         // url: 'https://node-dashboard-server.vercel.app/ai2', //prod url
    //         params: {'lookup':1},
    //         url: `http://localhost:8008/libz/tokenz/${param}`,
    //     }
    //     axios.request(options).then((response) => {
    //         debugger;
    //         setTokenITEMS(response.data.tokenz)
    //         setItemCOUNT("tokenz "+response.data.tokenz.length)
    //         console.log("LOADED TOKENFRAME ITEMS", response.data.tokenz.length)
    //     }).catch((error) => {
    //         console.error(error)
    //         setItemCOUNT("no data")
    //     })    
    // }

    let [isHovered, setHovered] = useState(false);

    let handleMouseEnter = () => {
        setHovered(true)
    }
    let handleMouseLeave = () => {
        setHovered(false)
    }

    function onTokenCardClick(  ){ 
        console.log("clicked",token.title)
        setTokenViewfn("pageview",token);
        // getTokenITEMS()
    }

    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
        alignContent:'flex-end',alignItems:'stretch', minHeight:'10em',width:'95%',
        flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly'
    } 

    let gameTitle = "";
    let gameFontColor = "";
    function gameAGENT(token){ //REACT to state and RESPOND
        if(!token || !token.state){return}
        else if (token.state.title ==='locked'){gameTitle =  'X'}
        else if (token.state.title ==='prize'){gameTitle =  '!'}
        else if (token.state.title ==='clue'){gameTitle =  '?'}

        gameFontColor = (token.state.title ==='prize')?'mediumpurple':(token.state.title ==='clue')
        ?'#d08701':(token.state.title ==='locked')?'#de6666':'steelblue';
    }
    // let gameTitle = gameAGENT(token); 
    gameAGENT(token); 
    // let dynamicFontColor = (token.state.title ==='prize')?'mediumpurple':(token.state.title ==='clue')
    // ?'#d08701':(token.state.title ==='locked')?'#de6666':'steelblue';
    //-----------------TOKEN---------------
    return (<>
        {/* <h2>StoryFrame</h2> */}
        <button className={isHovered ? 'btnHover' : ''} style={cardStyle}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            onClick={onTokenCardClick}>
            { (token.state)?
                <section style={{background:'lightskyblue',flex:'1',borderTopLeftRadius:'13px',
                    borderTopRightRadius:'13px',display:'flex',justifyContent:'center',
                    color:gameFontColor, flexDirection:'column',
                    alignItems:'center',fontSize:'xx-large',paddingTop:'0.333em'}}>
                    <main style={{display:'flex',flex:'1',alignItems:'center'}}>{gameTitle}</main>
                    <aside style={{fontSize:'x-small', color:'steelblue'}}>
                       {token.state.title}
                    </aside>
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