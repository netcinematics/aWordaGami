import './App.css';
import OverView from './views/OverView';
import AWordaGami1 from './views/aWordaGami1';
import WordGame1 from './views/WordGame1';
import WordGame2 from './views/WordGame2';
import WordGame3 from './views/WordGame3';
import WordGame4 from './views/WordGame4';
import WordGame5 from './views/WordGame5';
import Zoom from 'react-reveal/Zoom';
import { useState } from 'react';

function App() {
  const [viewIDX, setViewIDX] = useState('MainView');

  return (
    <div className="App" style={{backgroundColor: 'black',minHeight: '77vh',maxWidth:'55em',margin:'0 auto'}}>
      <header className="App-header" style={{borderRadius:'13px'}}>
        aWORDaGAMi
      </header>
      <main style={{backgroundColor: 'rgb(22 35 62)', color:'skyblue',color:'skyblue',paddingTop:'1.5em',
        borderRadius:'13px',margin:'1em'}}>

      {         
        <AWordaGami1/>
        // (() => { //DYNAMIC-VIEW-DISPLAY (design~innovation) //TODO Routing
        //   if (viewIDX === "MainView") {
        //     // return <WordGame1/>;
        //   } else if (viewIDX === "TikTacToe") {
        //     return <OverView/> ;
        //     // return <MainView main={main} /> ;
        //   }
        // })()
      }

           {/* <Zoom> //TODO: animations */}
              {/* <p>Markup  revealed on scroll</p> */}
            {/* </Zoom> */}

      </main>
      <section style={{color:'steelblue',fontSize:'0.666em',marginTop:'2em'}}>
        work in progress by spazefalcon &copy; 2023
      </section>
    </div>
  );
}

export default App;
