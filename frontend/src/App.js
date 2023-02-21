import './App.css'
import React, { useState, useEffect } from 'react';
import UploadSprite from './components/UploadSprite';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/Signup'
import Login from './components/Login';
import SceneEditor from './components/SceneEditor';
import SceneViewer from './components/SceneViewer';
import UserScenes from './components/UserScenes'
import Scenes from './components/Scenes'
import Sprites from './components/Sprites';
import Navbar from './components/Navbar';
import Logout from './components/Logout';

function App() {
  //JSON.parse(window.localStorage.getItem("user"))
  const [user, setUser] = useState(null);  
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState('/login');
  const [scenes, setScenes] = useState([]);
  const [renderScene, setRenderScene] = useState(null)
  const [drag, setDrag] = useState(null);

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if(res.ok){
        //debugger
        res.json()
        .then((user) => {
          setUser(user)
          getScenes()
        })
      }
    })
    }, []);

  // useEffect(() => {
  //     getScenes()
  // }, []);

  const getScenes = () => {
    fetch("/scenes")
    .then(resp => resp.json())
    .then(data => {
      //console.log(data)
      setScenes(data)
    })
  }

  //console.log(user)
  //console.log(selectedGO)
  //console.log(gameObjects)
  //console.log(renderScene)

  const userScenes = user ? scenes.filter(scene => scene.user.id === user.id) : null

  return (
    <div className="App">
      {user ?
        <div>
          <Navbar user={user}/>
          <Routes>
            <Route path="/scenes/*" element={<SceneEditor scene={renderScene} user={user} drag={drag}/>}/>
            <Route path="/user_scenes/*" element={<SceneViewer scene={renderScene} user={user} drag={drag}/>}/>
            <Route path="/user_scenes" element={<UserScenes scenes={userScenes} setScenes={setScenes} setRenderScene={setRenderScene} user={user}/>}/>
            <Route path="/scenes" element={<Scenes scenes={scenes} setScenes={setScenes} setRenderScene={setRenderScene} user={user}/>}/>
            <Route path="/logout" element={<Logout setUser={setUser}/>}/>
            {/* <Route path="/*" element={<SceneEditor gameObjects={gameObjects} setGameObjects={setGameObjects} selectedGO={selectedGO} setSelectedGO={setSelectedGO} canvasProps={canvasProps} play={play} setPlay={setPlay} playableObjects={playableObjects} setPlayableObjects={setPlayableObjects} sprites={sprites}/>}/> */}
          </Routes>
        </div>
      :
        <Routes>
              <Route path="/login" element={<Login setUser={setUser} setMessage={setMessage} setPage={setPage}/>}/>
              <Route path="/signup" element={<SignUp setPage={setPage}/>}/>
              <Route path="*" element={<Login setUser={setUser} setMessage={setMessage} setPage={setPage}/>}/>
        </Routes>
      }
      {user ? 
      <>
        <UploadSprite user={user}/>
        <Sprites setDrag={setDrag} user={user}/>
      </>
      : null}
    </div>
  );
}

export default App;
