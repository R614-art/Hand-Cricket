import './App.css';
import Card from './Components/Card/Card';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Game from './Components/Game/Game';
import Instructions from './Components/Instructions/Instructions';
import Multi from './Components/Multi/Multi';
import Multicard from './Components/MultiCard/Multicard';
import JoinRoomCard from './Components/JoinRoomCard/JoinRoomCard';
import Profile from './Components/Profile/Profile';
import { SignedIn,SignedOut,RedirectToSignIn } from '@clerk/clerk-react';


function App() {
  return (
    <div className="vh-100">
      <Router>
        <SignedIn>
          <Routes>
            <Route path='/' element={<Card/>}/>
            <Route path='/instructions' element={<Instructions/>} />
            <Route path='/playwithcomp' element={<Game/>} />
            <Route path='/quickplay' element={<Multi mode='quickplay'/>} />
            <Route path='/createroom' element={<Multi mode='createroom'/>} />
            <Route path='/joinroom' element={<JoinRoomCard/>} />
            <Route path='/joinroomplay' element={<Multi mode='joinroom' />} />
            <Route path='/multioptions' element={<Multicard/>} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </Router>
    </div>
  );
}

export default App;
