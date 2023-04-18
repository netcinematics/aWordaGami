import { useState } from 'react';
import "../styles.css";

export default function MainView () {

    return (
        <article style={{height:'55vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
            <h1>Welcome!</h1>
            <hr style={{width:'100%'}}></hr>
            <section style={{fontSize:'x-large'}}>
            Artificial Intelligence Sandbox:<br/>
            <ol style={{width:'50%',margin:'1em auto'}}>
                <li>LEARN Ai concepts</li>
                <li>EXPLORE ChatGPT API</li>
                <li>TEST innovative USE-CASES</li>
                <li>MERGE Ai within Web3 Dapps!</li>
            </ol>
            </section>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>
                This code is a LEARNING TOOL, for Ai CONCEPTS like:
                Natural Language Processing (NLP), Language Models (LLM),
                Tokenizers, MetaData State Attribution, and Algorithms.
                <br></br><br></br>Work in progress...
            </section>
        </article>
    )

};