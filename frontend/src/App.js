import './App.css';
import GameObject from './Scripts/GameObject';
import Canvas from './components/Canvas'
import React, { useState } from 'react';
import Inspector from './components/Inspector';
import NewGameObjectForm from './components/NewGameObjectForm';
import PlayButton from './components/PlayButton';

function App() {
  const [gameObjects, setGameObjects] = useState([]);
  const [playableObjects, setPlayableObjects] = useState([]);
  const [selectedGO, setSelectedGO] = useState(null);
  const [play, setPlay] = useState(false);

  const canvasProps = {
    options: {
      width: 600,
      height: 500
    }
  }

  const editGameObject = (updates) => {
    selectedGO = updates
  }

  //console.log(selectedGO)

  return (
    <div className="App">
      <NewGameObjectForm setGameObjects={setGameObjects}/>
      <Canvas props={canvasProps} gameObjects={gameObjects} setGameObjects={setGameObjects} setSelectedGameObject={setSelectedGO} play={play} playableObjects={playableObjects}/>
      <PlayButton gameObjects={gameObjects} play={play} setPlay={setPlay} setPlayableObjects={setPlayableObjects}/>
      {selectedGO ? <Inspector gameObject={selectedGO} setGameObject={setSelectedGO}/> : null}
    </div>
  );
}

export default App;
