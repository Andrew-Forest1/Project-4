import Inspector from './Inspector';
import NewGameObjectForm from './NewGameObjectForm';
import PlayButton from './PlayButton';
import Canvas from './Canvas'
import { useState } from 'react';

function SceneEditor({gameObjects, setGameObjects, selectedGO, setSelectedGO, canvasProps, play, setPlay, playableObjects, setPlayableObjects, sprites}){
    const [components, setComponents] = useState([]);

    return (
        <div className='editor'>
            <NewGameObjectForm setGameObjects={setGameObjects}/>
            <Canvas props={canvasProps} gameObjects={gameObjects} setGameObjects={setGameObjects} setSelectedGameObject={setSelectedGO} play={play} playableObjects={playableObjects}/>
            <PlayButton gameObjects={gameObjects} play={play} setPlay={setPlay} setPlayableObjects={setPlayableObjects}/>
            {selectedGO ? <Inspector gameObject={selectedGO} setGameObject={setSelectedGO} components={components} sprites={sprites}/> : null}
        </div>
    )
}

export default SceneEditor