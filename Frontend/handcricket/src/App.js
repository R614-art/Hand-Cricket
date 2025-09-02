import './App.css';
import Card from './Components/Card';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Game from './Components/Game';
import Instructions from './Components/Instructions';
import Multi from './Components/Multi';

function App() {
  return (
    <div className="vh-100">
      <Router>
        <Routes>
          <Route path='/' element={<Card/>}/>
          <Route path='/instructions' element={<Instructions/>} />
          <Route path='/playwithcomp' element={<Game/>} />
          <Route path='/playwithplayer' element={<Multi/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
