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
                <ol style={{width:'50%',margin:'1em auto'}}>
                    <li>SHOW Ai NLP Concepts and Design Patterns</li>
                    <li>EXPLORE ChatGPT API LLM integrations</li>
                    <li>INNOVATE new Ai USE-CASES with WEB3</li>
                    <li>MERGE with create-web3-DApp!</li>
                </ol>
            </section>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>
                This code is a WORKSPACE to PRACTICE Ai CONCEPTS like:
                Natural Language Processing (NLP), Language Models (LLM),
                Tokenizers, MetaData, State Attribution, Algorithms and more!
                <br></br><br></br>fork, PR, or drop a star:&nbsp;
                <a href='https://github.com/netcinematics/aWordaGami' target="_blank">GitHub</a>...
            </section>
        </article>
    )

};