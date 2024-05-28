import { useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Home/Home.jsx';
import Subhost from './Video/Subhost';
import Videoplayer from './Video/Videoplayer';
import Search from './Components/Search';
import Searchplayer from './Video/Searchplayer';

function App() {

  const [sidebar, setsidebar] = useState(true);
  return (
    <div className="App">
      <Navbar setsidebar={setsidebar} sidebar={sidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Videoplayer />} />
        <Route path='/subscribe' element={<Subhost />} />
        <Route path='/search/:searchvalue' element={<Search />} />
        <Route path='/Searchplayer/:links' element={<Searchplayer />} />
      </Routes>

    </div>
  );
}

export default App;
