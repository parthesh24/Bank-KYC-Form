import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalDetail from './components/PersonalDetail';
import AlternateDetails from './components/AlternateDetails';
import {NomineeDetail} from './components/NomineeDetail';
import {UploadFiles} from './components/UploadFiles';
import Success from './components/Success';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PersonalDetail/>}/>
          <Route path='/alternate-details' element={<AlternateDetails/>} />
          <Route path='/nominee-details' element={<NomineeDetail/>}/>
          <Route path='/upload-files' element={<UploadFiles/>}/>
          <Route path='/success' element={<Success/>}/>
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
