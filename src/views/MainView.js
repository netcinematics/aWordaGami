import Typewriter from "typewriter-effect";
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
// import { useState } from 'react';
// import React, { useEffect } from "react";
import { useEffect } from "react";
// import {useEffect, useState} from 'react'
import axios from 'axios'
import "../styles.css";

export default function MainView () {

    useEffect(() => { document.title = "Good_Ai";  }, []);
    useEffect(() => {
       getMarkdownDATA();
    }, [])

    function getMarkdownDATA(){
    // if(!prompt)return; 
    const options = {
        method: 'GET',
        // url: 'https://node-dashboard-server.vercel.app/ai2',
        params: {'lookup':'tokenz'},
        // url: 'http://localhost:8008/news',
        url: 'http://localhost:8008/libz/',
        // params: {prompt:'what time is it?'}
    }
    axios.request(options).then((response) => {
        // debugger;
        console.log("CLIENT data:", response.data)
        //setResponses(response.data)
    }).catch((error) => {
        console.error(error)
    })    
    }

    function handleClick(){
        getMarkdownDATA();
    }


    return (<>
        <header className="App-header" style={{borderRadius:'13px'}}>
        <Zoom>Welcome!</Zoom>
        </header>
        <article style={{height:'55vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',
            borderRadius:'10px', backgroundColor: 'rgb(22 35 62)'}}>
            <code>Artificial Intelligence Sandbox:</code><br/>
            a workspace to learn ai code<br/>
            <hr style={{width:'100%'}}></hr>
            <section style={{fontSize:'x-large',display:'flex',justifyContent:'center'}}>
                <ol style={{margin:'1em auto',textAlign:'left'}}>
            <Fade cascade  damping={0.444} delay='1000' duration='4000'>
                    <li>Ai NLP Concepts</li>
                    <li>Ai Patterns in React</li>
                    <li>Ai with Web3?</li>
                    <li>Ai in NodeJS?</li>
                    <li>Data Visualization D3.js</li>
            </Fade>
                </ol>
            </section>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>
                {/* <Fade delay={1e3} cascade damping={1e-1}> */}
                <div className="sub">
          <Typewriter
            options={{
              strings: ["This code is a WORKSPACE to PRACTICE Ai CONCEPTS.", 
                    "Like Natural Language Processing (NLP), Language Models (LLM),", 
                    "Tokenizers, MetaData, State Machine, Algorithms and more!"],
              autoStart: true,
              loop: true,
              delay: 50,
              changeDeleteSpeed:4
            }}
          />
        </div>

                {/* </Fade> */}
                <br></br><br></br>fork, PR, or drop a star:&nbsp;
                <a href='https://github.com/netcinematics/aWordaGami' target="_blank">GitHub</a>...
            </section>
        </article>
    </>)

};