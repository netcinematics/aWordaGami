import './App.css';
// import DynamicWordGame1 from './views/DynamicWordGame1';
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
        <AWordaGami1/>
        // <WordGame4/>
        // (() => { //DYNAMIC-VIEW-DISPLAY (design~innovation)
        //   if (viewIDX === "MainView") {
        //     // return <WordGame5/>;
        //     return <WordGame4/>;
        //     // return <WordGame3/>;
        //     // return <WordGame2/>;
        //     // return <WordGame1/>;
        //   } else if (viewIDX === "TikTacToe") {
        //     return <OverView/> ;
        //     // return <MainView main={main} /> ;
        //   }
        // })()
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
