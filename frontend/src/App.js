import './App.css';
import GameObject from './Scripts/GameObject';
import Canvas from './components/Canvas'
import React, { useState } from 'react';
import Inspector from './components/Inspector';
import NewGameObjectForm from './components/NewGameObjectForm';
import PlayButton from './components/PlayButton';
import PlayButtonTest from './components/PlayButtonTest';
import CreateComponent from './components/CreateComponent';
import ScriptEditor from './components/ScriptEditor';
import cloud from './cloud_shape1_1.png'
import UploadSprite from './components/UploadSprite';

function App() {
  const [gameObjects, setGameObjects] = useState([]);
  const [playableObjects, setPlayableObjects] = useState([]);
  const [selectedGO, setSelectedGO] = useState(null);
  const [play, setPlay] = useState(false);
  const [components, setComponents] = useState([]);
  const [showCanvas, setShowCanvas] = useState(true);
  const [sprites, setSprites] = useState([cloud]);

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
      <button onClick={() => setShowCanvas(!showCanvas)}>Edit</button>
      {showCanvas ?
        <div className='editor'>
          <NewGameObjectForm setGameObjects={setGameObjects}/>
          <Canvas props={canvasProps} gameObjects={gameObjects} setGameObjects={setGameObjects} setSelectedGameObject={setSelectedGO} play={play} playableObjects={playableObjects}/>
          <PlayButton gameObjects={gameObjects} play={play} setPlay={setPlay} setPlayableObjects={setPlayableObjects}/>
          {selectedGO ? <Inspector gameObject={selectedGO} setGameObject={setSelectedGO} components={components} sprites={sprites}/> : null}
        </div> :
        <ScriptEditor setComponents={setComponents}/>
      }
      <br/>
      <CreateComponent setComponents={setComponents}/>
      <br/>
      <UploadSprite/>
    </div>
  );
}

export default App;
