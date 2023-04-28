import Fade from 'react-reveal/Fade';
import { useState } from 'react';
import "../styles.css";

export default function MainView () {

    return (
        <article style={{height:'55vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
            <h1>Welcome!</h1>
            <code>Artificial Intelligence Sandbox:</code><br/>
            a workspace to learn ai code<br/>
            <hr style={{width:'100%'}}></hr>
            <section style={{fontSize:'x-large',display:'flex',justifyContent:'center'}}>
                <ol style={{width:'48%',margin:'1em auto',textAlign:'left'}}>
            <Fade cascade  damping={0.444} delay='1000' duration='4000'>
                    <li>SHOW Ai NLP Concepts</li>
                    <li>EXPLORE ChatGPT API</li>
                    <li>INNOVATE Web3/Ai USE-CASES</li>
                    <li>MERGE create-web3-DApp!</li>
            </Fade>
                </ol>
            </section>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>
                <Fade delay={1e3} cascade damping={1e-1}>
                <span>This code is a WORKSPACE to PRACTICE Ai CONCEPTS like:</span>
                <span>Natural Language Processing (NLP), Language Models (LLM),</span>
                <span>Tokenizers, MetaData, State Attribution, Algorithms and more!</span></Fade>
                <br></br><br></br>fork, PR, or drop a star:&nbsp;
                <a href='https://github.com/netcinematics/aWordaGami' target="_blank">GitHub</a>...
            </section>
        </article>
    )

};