import Inspector from './Inspector';
import NewGameObjectForm from './NewGameObjectForm';
import PlayButton from './PlayButton';
import Canvas from './Canvas'
import React, { useState, useEffect } from 'react';
import GameObject from '../Scripts/GameObject';
import cloud from '../cloud_shape1_1.png'
import { useNavigate } from 'react-router-dom';

function SceneEditor({scene, user, drag}){
    const [gameObjects, setGameObjects] = useState(null);
    const [playableObjects, setPlayableObjects] = useState([]);
    const [selectedGO, setSelectedGO] = useState(null);
    const [play, setPlay] = useState(false);
    const [sprites, setSprites] = useState([]);
    const [animations, setAnimations] = useState([{id:1, name:'Circle'}, {id:2, name:'Bob'}, {id:3, name:'Sway'}]);
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
            if(gameObject.sprite !== null){
                img = new Image()
                img.src = gameObject.sprite.image_url
                img.name = gameObject.sprite.name
                img.crossOrigin="anonymous"
            }
            const go = new GameObject({x: gameObject.x_pos, y: gameObject.y_pos}, gameObject.rotation, {w: gameObject.w_scale, h: gameObject.h_scale}, gameObject.shape, img, gameObject.id)
            go.animations = gameObject.animations
            return go
        })
        setGameObjects(newGameObjects)
    }

    const handleSave = (e) => {
        const canvas = document.getElementsByClassName('myCanvas')[0]
        const newImage = {image: canvas.toDataURL()}
        fetch(`http://localhost:3000${window.location.pathname}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newImage)
        })
        .then(resp => resp.json())
    }

    if(!gameObjects) return (<label>Loading</label>)

    return (
        <div className='editor'>
            <NewGameObjectForm setGameObjects={setGameObjects} scene={scene}/>
            <Canvas props={canvasProps} gameObjects={gameObjects} setGameObjects={setGameObjects} selectedGO={selectedGO} setSelectedGameObject={setSelectedGO} play={play} playableObjects={playableObjects} dragSprite={drag}/>
            <PlayButton gameObjects={gameObjects} play={play} setPlay={setPlay} setPlayableObjects={setPlayableObjects}/>
            <button onClick={handleSave}>Save</button>
            {selectedGO ? <Inspector gameObject={selectedGO} setSelectedGO={setSelectedGO} setGameObjects={setGameObjects} animations={animations} sprites={sprites}/> : null}
        </div>
    )
}

export default SceneEditor