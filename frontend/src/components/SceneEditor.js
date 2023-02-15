import Inspector from './Inspector';
import NewGameObjectForm from './NewGameObjectForm';
import PlayButton from './PlayButton';
import Canvas from './Canvas'
import React, { useState, useEffect } from 'react';
import GameObject from '../Scripts/GameObject';
import cloud from '../cloud_shape1_1.png'
import { useNavigate } from 'react-router-dom';

function SceneEditor({scene, user}){
    const [gameObjects, setGameObjects] = useState(null);
    const [playableObjects, setPlayableObjects] = useState([]);
    const [selectedGO, setSelectedGO] = useState(null);
    const [play, setPlay] = useState(false);
    const [sprites, setSprites] = useState([]);
    const [components, setComponents] = useState([]);
    const navigate = useNavigate()
    const canvasProps = {
        options: {
          width: 600,
          height: 500
        }
    }

    //console.log(window.location.pathname)

    useEffect(() => {
        fetch(`http://localhost:3000${window.location.pathname}`)
        .then(resp => resp.json())
        .then(data => {
            // if(data.user.id === 1){
            getGameObjects(data)
            // }else{
            //     navigate(-1)
            // }  
        })
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/sprites`)
        .then(resp => resp.json())
        .then(data => { 
            setSprites(data)
        })
    }, []);

    const getGameObjects = (gameObjects) => {
        const newGameObjects = gameObjects.map(gameObject => {
            let img = ""
            console.log(gameObject)
            if(gameObject.sprite !== null){
                img = new Image()
                img.src = gameObject.sprite.image_url
                img.name = gameObject.sprite.name
            }
            return new GameObject({x: gameObject.x_pos, y: gameObject.y_pos}, gameObject.rotation, {w: gameObject.w_scale, h: gameObject.h_scale}, gameObject.shape, img, gameObject.id)
        })
        setGameObjects(newGameObjects)
    }

    if(!gameObjects) return (<label>Loading</label>)

    return (
        <div className='editor'>
            <NewGameObjectForm setGameObjects={setGameObjects}/>
            <Canvas props={canvasProps} gameObjects={gameObjects} setGameObjects={setGameObjects} setSelectedGameObject={setSelectedGO} play={play} playableObjects={playableObjects}/>
            <PlayButton gameObjects={gameObjects} play={play} setPlay={setPlay} setPlayableObjects={setPlayableObjects}/>
            {selectedGO ? <Inspector gameObject={selectedGO} setSelectedGO={setSelectedGO} setGameObjects={setGameObjects} components={components} sprites={sprites}/> : null}
        </div>
    )
}

export default SceneEditor