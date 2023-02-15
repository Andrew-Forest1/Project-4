import Inspector from './Inspector';
import NewGameObjectForm from './NewGameObjectForm';
import PlayButton from './PlayButton';
import Canvas from './Canvas'
import React, { useState, useEffect } from 'react';
import GameObject from '../Scripts/GameObject';
import cloud from '../cloud_shape1_1.png'

function SceneEditor({scene}){
    const [gameObjects, setGameObjects] = useState([]);
    const [playableObjects, setPlayableObjects] = useState([]);
    const [selectedGO, setSelectedGO] = useState(null);
    const [play, setPlay] = useState(false);
    const [sprites, setSprites] = useState([cloud]);
    const [components, setComponents] = useState([]);

    const canvasProps = {
        options: {
          width: 600,
          height: 500
        }
    }

    console.log(window.location.pathname)

    useEffect(() => {
        fetch(`http://localhost:3000${window.location.pathname}`)
        .then(resp => resp.json())
        .then(data => getGameObjects(data.game_objects))//console.log(data))//setPost(data))
        //console.log("fetching scenes")
    }, []);

    const getGameObjects = (gameObjects) => {
        const newGameObjects = gameObjects.map(gameObject => {
            return new GameObject({x: gameObject.x_pos, y: gameObject.y_pos}, gameObject.rotation, {w: gameObject.w_scale, h: gameObject.h_scale}, gameObject.shape, "")
        })
        setGameObjects(newGameObjects)
    }

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