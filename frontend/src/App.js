import './App.css';
import GameObject from './Scripts/GameObject';
import React, { useState, useEffect } from 'react';
import cloud from './cloud_shape1_1.png'
import UploadSprite from './components/UploadSprite';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/Signup'
import Login from './components/Login';
import SceneEditor from './components/SceneEditor';
import Scenes from './components/Scenes'

function App() {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));  
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState('/login');
  const [gameObjects, setGameObjects] = useState([]);
  const [playableObjects, setPlayableObjects] = useState([]);
  const [selectedGO, setSelectedGO] = useState(null);
  const [play, setPlay] = useState(false);
  const [sprites, setSprites] = useState([cloud]);
  const [scenes, setScenes] = useState([]);

  const canvasProps = {
    options: {
      width: 600,
      height: 500
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/scenes")
    .then(resp => resp.json())
    .then(data => setScenes(data))//setPost(data))
    }, []);

  const editGameObject = (updates) => {
    selectedGO = updates
  }

  //console.log(selectedGO)

  return (
    <div className="App">
      {!user ?
        <Routes>
          <Route path="/scenes/*" element={<SceneEditor gameObjects={gameObjects} setGameObjects={setGameObjects} selectedGO={selectedGO} setSelectedGO={setSelectedGO} canvasProps={canvasProps} play={play} setPlay={setPlay} playableObjects={playableObjects} setPlayableObjects={setPlayableObjects} sprites={sprites}/>}/>
          <Route path="/scenes" element={<Scenes scenes={scenes} setScenes={setScenes}/>}/>
          <Route path="/*" element={<SceneEditor gameObjects={gameObjects} setGameObjects={setGameObjects} selectedGO={selectedGO} setSelectedGO={setSelectedGO} canvasProps={canvasProps} play={play} setPlay={setPlay} playableObjects={playableObjects} setPlayableObjects={setPlayableObjects} sprites={sprites}/>}/>
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

    </div>
  );
}

export default App;
