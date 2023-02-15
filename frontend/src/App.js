import './App.css'
import React, { useState, useEffect } from 'react';
import UploadSprite from './components/UploadSprite';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/Signup'
import Login from './components/Login';
import SceneEditor from './components/SceneEditor';
import Scenes from './components/Scenes'
import Sprites from './components/Sprites';

function App() {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));  
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState('/login');
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/scenes")
    .then(resp => resp.json())
    .then(data => setScenes(data))//setPost(data))
    //console.log("fetching scenes")
    }, []);

  //console.log(selectedGO)
  //console.log(gameObjects)

  return (
    <div className="App">
      {!user ?
        <Routes>
          <Route path="/scenes/*" element={<SceneEditor user={user}/>}/>
          <Route path="/scenes" element={<Scenes scenes={scenes} setScenes={setScenes}/>}/>
          {/* <Route path="/*" element={<SceneEditor gameObjects={gameObjects} setGameObjects={setGameObjects} selectedGO={selectedGO} setSelectedGO={setSelectedGO} canvasProps={canvasProps} play={play} setPlay={setPlay} playableObjects={playableObjects} setPlayableObjects={setPlayableObjects} sprites={sprites}/>}/> */}
        </Routes>
      :
        <Routes>
              <Route path="/login" element={<Login setUser={setUser} setMessage={setMessage} setPage={setPage}/>}/>
              <Route path="/signup" element={<SignUp setPage={setPage}/>}/>
              <Route path="*" element={<Login setUser={setUser} setMessage={setMessage} setPage={setPage}/>}/>
        </Routes>
      }
      <br/>
      <UploadSprite/>
      <Sprites/>
    </div>
  );
}

export default App;
