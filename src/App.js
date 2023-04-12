import './App.css';
import PortfolioView from './views/PortfolioView';
import OverView from './views/OverView';
import WordGame1 from './views/WordGame1';
import Zoom from 'react-reveal/Zoom';
import { useState } from 'react';


function App() {
    const [count, setCount] = useState(0);
    function btnClick() {
      setCount(count + 1);
    }

  return (
    <div className="App" style={{backgroundColor: 'black',minHeight: '100vh'}}>
      <header className="App-header">
      aWordaGami
      </header>
      <main style={{backgroundColor: 'rgb(22 35 62)', color:'skyblue',color:'skyblue',paddingTop:'1.5em',
      borderRadius:'18px',margin:'1em'}}>
        {count%2===0 ? (
          <>
          {/* <Game/> */}
          {/* <PortfolioView/> */}
          {/* <OverView/> */}
          <WordGame1/>
          </>
          ) : (
            <Zoom>
              <p>Markup that will be revealed on scroll</p>
            </Zoom>

        )}
      </main>
      <section>
        {/* <MainButton/> */}
        <button onClick={btnClick}>
        {count}
      </button>
      </section>
    </div>
  );
}

export default App;
