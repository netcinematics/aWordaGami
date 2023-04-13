import './App.css';
// import DynamicWordGame1 from './views/DynamicWordGame1';
import OverView from './views/OverView';
import WordGame1 from './views/WordGame1';
import Zoom from 'react-reveal/Zoom';
import { useState } from 'react';


function App() {
    // const [count, setCount] = useState(0);
    const [viewIDX, setViewIDX] = useState('MainView');

    // function btnClick() {
    //   // setCount(count + 1);
    //   setViewIDX('DynamicWordGame1');
    // }

  return (
    <div className="App" style={{backgroundColor: 'black',minHeight: '84vh'}}>
      <header className="App-header" style={{borderRadius:'13px'}}>
      aWordaGami
      </header>
      <main style={{backgroundColor: 'rgb(22 35 62)', color:'skyblue',color:'skyblue',paddingTop:'1.5em',
      borderRadius:'13px',margin:'1em'}}>

      {         
        (() => { //DYNAMIC-VIEW-DISPLAY (design~innovation)
          if (viewIDX === "MainView") {
            return <WordGame1/>;
          } else if (viewIDX === "TikTacToe") {
            return <OverView/> ;
            // return <MainView main={main} /> ;
          }
        })()
      }

        {/* {count%2===0 ? ( */}
          {/* <> */}
          {/* <Game/> */}
          {/* <PortfolioView/> */}
          {/* <OverView/> */}
          {/* <WordGame1/> */}
          {/* </> */}
          {/* ) : ( */}
            {/* <Zoom> */}
              {/* <p>Markup  revealed on scroll</p> */}
            {/* </Zoom> */}

        {/* )} */}
      </main>
      <section>
        {/* <MainButton/> */}
        {/* <button onClick={btnClick}>
         NEXT GAME;
      </button> */}
      </section>
    </div>
  );
}

export default App;
