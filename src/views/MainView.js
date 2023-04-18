import { useState } from 'react';
import "../styles.css";

export default function MainView () {

    return (
        <article style={{height:'66vw',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
            <h1>Welcome!</h1>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'x-large'}}>
            Artificial Intelligence sandbox.<br/>
            This area is used to LEARN Ai Computer Science concepts, 
            and to EXPERIMENT with INTEGRATIONS like 
            Alchemy create-web3-dapp and other plugins.
            </section>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'x-large'}}>
                This code demonstrates Data Structures like:
                Neural Nets, Large Language Models, Tokenizers, 
                Natural Language Processing, MetaData Storage,
                and state machine.
            </section>
        </article>
    )

};