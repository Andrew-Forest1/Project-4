import Scene from './Scene'
import { useState } from 'react'

function Scenes({scenes, setScenes, setRenderScene}){
    const [newScene, setNewScene] = useState({
        user_id: 1,
        name: ''
    });

    const onClick = (e) => {
        fetch('http://localhost:3000/scenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newScene)
        })
        .then(res => res.json())
        .then(post => {
            setScenes(current => {
                return[post, ...current]
            })
        })
        .catch((error) => {
            console.log(error)
        })
        setNewScene({
            user_id: 1,
            name: ''
        })
    }

    const onChange = (e) => {
        setNewScene(current => {return {...current, name:e.target.value}})
    }

    const displayScenes = scenes.map(scene => {
        return (
            <div>
                <Scene scene={scene} setScenes={setScenes} setRenderScene={setRenderScene} key={`Scene-${scene.id}`}/>
            </div>
        )
    })

    return (
        <div>
            {displayScenes}
            <input type="text" onChange={onChange} value={newScene.name}/>
            <button onClick={onClick}>Create New Scene</button>
        </div>
    )
}

export default Scenes