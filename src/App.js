import './App.css';
import MainView from './views/MainView';
import TokenGrid1 from './views/TokenGrid1';
import StoryGrid1 from './views/StoryGrid1';
import SongPhrases from './views/SongPhrases';
import TicTacToe from './views/TicTacToeView';
import AWordaGami1 from './views/aWordaGami1';
import Zoom from 'react-reveal/Zoom';
import { useState } from 'react';

function App() {
  const [viewIDX, setViewIDX] = useState('aWORDaGAMi');
  
  function CLICKview (e) {
    setViewIDX(e.target.innerText);
  }

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',backgroundColor: 'black',
      minHeight: '77vh',maxWidth:'55em',margin:'0 auto',padding:'0.444em'}}>
      <header className="App-header" style={{borderRadius:'13px'}}>
      <Zoom>{viewIDX}</Zoom>
      </header>
      <main style={{backgroundColor: 'rgb(22 35 62)', color:'skyblue',color:'skyblue',paddingTop:'1.5em',
        borderRadius:'13px',margin:'1em',height:'42em',overflowY:'auto'}}>

      {         
        (() => { //SIMPLE-DYNAMIC-VIEW-DISPLAY: (design~innovation) // Routing - nah...
          if (viewIDX === "aWORDaGAMi") {
              return <AWordaGami1/>;
          } else if (viewIDX === "TicTacToe") {
            return <TicTacToe/>;
          } else if (viewIDX === "StoryGrid") {
            return <StoryGrid1/>;
            // return <TokenGrid1/>;
          } else if (viewIDX === "SongPhrases") {
            return <SongPhrases/>;
          } else {
            return <MainView/>;
          }
        })()
      }
      </main>
      <nav style={{marginTop:'1em'}}>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px purple'}}
           onClick={CLICKview}>MAIN</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px lime'}}
           onClick={CLICKview}>aWORDaGAMi</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px yellow'}}
           onClick={CLICKview}>TicTacToe</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={CLICKview}>StoryGrid</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={CLICKview}>SongPhrases</button>
      </nav>
      <section style={{color:'steelblue',fontSize:'0.666em',marginTop:'2em'}}>
        MIT - work in progress by spazefalcon  - &copy; 2023
      </section>      
    </div>
  );
}

export default App;
