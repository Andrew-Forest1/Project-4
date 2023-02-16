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
  const [renderScene, setRenderScene] = useState(null)
  const [drag, setDrag] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/scenes")
    .then(resp => resp.json())
    .then(data => {
      setScenes(data)
    })//setPost(data))
    //console.log("fetching scenes")
    }, []);

  //console.log(selectedGO)
  //console.log(gameObjects)
  //console.log(renderScene)

  const updateSceneImage = () => {
    debugger
  }

  return (
    <div className="App">
      {!user ?
        <Routes>
          <Route path="/scenes/*" onLeave={updateSceneImage} element={<SceneEditor scene={renderScene} user={user} drag={drag}/>}/>
          <Route path="/scenes" element={<Scenes scenes={scenes} setScenes={setScenes} setRenderScene={setRenderScene}/>}/>
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
      <Sprites setDrag={setDrag}/>
    </div>
  );
}

export default App;
