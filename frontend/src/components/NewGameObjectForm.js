import { useState } from "react"
import GameObject from "../Scripts/GameObject";

function NewGameObjectForm({setGameObjects}){
    const [newGameObject, setNewGameObject] = useState({
        xposition: 100,
        yposition: 100,
        rotation: 0,
        xscale: 5,
        yscale: 5,
        shape: 'circle'
    });

    const handleChange = (e) => {
        if(e.target.name !== 'shape'){
            setNewGameObject({...newGameObject, [e.target.name]:e.target.value * 1})
        }else{
            setNewGameObject({...newGameObject, [e.target.name]:e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setGameObjects(current => [...current, new GameObject({x: newGameObject.xposition, y: newGameObject.yposition}, newGameObject.rotation, {w: newGameObject.xscale, h: newGameObject.yscale}, newGameObject.shape)])
    }

    return(
        <div >
            <form className="gameObjectForm" onSubmit={handleSubmit}>
                <label htmlFor="xposition">X-Position</label>
                <input onChange={handleChange} value={newGameObject.xposition} type="number" name="xposition"/>
                <label htmlFor="yposition">Y-Position</label>
                <input onChange={handleChange} value={newGameObject.yposition} type="number" name="yposition"/>
                <label htmlFor="rotation">Rotation</label>
                <input onChange={handleChange} value={newGameObject.rotation} type="number" name="rotation"/>
                <label htmlFor="xscale">X-Scale</label>
                <input onChange={handleChange} value={newGameObject.xscale} type="number" name="xscale"/>
                <label htmlFor="yscale">Y-Scale</label>
                <input onChange={handleChange} value={newGameObject.yscale} type="number" name="yscale"/>
                <label htmlFor="shape">Shape</label>
                <input onChange={handleChange} value={newGameObject.shape} type="text" name="shape"/>
                <br/>
                <button type="submit">Create New GameObject</button>
            </form>
        </div>
    )
}

export default NewGameObjectForm