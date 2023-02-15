import { useState } from "react"
import AddComponent from "./AddComponent";
import AddComponentTest from "./AddComponentTest";
import AddSprite from "./AddSprite";

function Inspector({gameObject, setSelectedGO, setGameObjects, components, sprites}){
    const [updatedGO, setUpdatedGO] = useState(gameObject);
    const [editing, setEditing] = useState("");

    const handleChange = (e) => {
        if(editing === ""){
            setEditing({[e.target.name]:e.target.value * 1})
        }else{
            setEditing(current => {return {...current, [e.target.name]:e.target.value * 1}})
        }
    }

    const handleLeave = (e) => {
        switch (e.target.name) {
            case "xposition":
                gameObject.globalPosition.x = e.target.value * 1
                gameObject.localPosition.x = e.target.value * 1
                break;

            case "yposition":
                gameObject.globalPosition.y = e.target.value * 1
                gameObject.localPosition.y = e.target.value * 1
                break;

            case "rotation":
                gameObject.globalRotation = e.target.value * 1
                gameObject.localRotation = e.target.value * 1
                break;

            case "xscale":
                gameObject.scale.w = e.target.value * 1
                break;    
                
            case "yscale":
                gameObject.scale.h = e.target.value * 1
                break;
        
            default:
                break;
        }
        console.log(gameObject)

        const newGO = {
            x_pos: gameObject.globalPosition.x,
            y_pos: gameObject.globalPosition.y,
            rotation: gameObject.rotation,
            w_scale: gameObject.scale.w, 
            h_scale: gameObject.scale.h, 
            shape: gameObject.shape
        }

        fetch(`http://localhost:3000/game_objects/${gameObject.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newGO)
        })


        setEditing("")
    }
    
    const handleClick = () => {
        fetch(`http://localhost:3000/game_objects/${gameObject.id}`, {
            method: 'DELETE'
        })
        setSelectedGO(null)
        setGameObjects(current => {
            const sceneId = current.findIndex(ele => ele.id === gameObject.id)
            return [...current.slice(0, sceneId), ...current.slice(sceneId + 1)]
        })
    }

    const createNewComponent = () => {
        //debugger
        gameObject.componets.push('./Test.js')
        console.log(gameObject)
    }

    if(gameObject === null) return <div/>

    return(
        <div className="inspector">
            <div>
                <label htmlFor="XPosition">X-Position</label>
                <input onBlur={handleLeave} onChange={handleChange} value={editing.xposition === undefined ? gameObject.localPosition.x : editing.xposition} type="number" name="xposition"/>
                <label htmlFor="YPosition">Y-Position</label>
                <input onBlur={handleLeave} onChange={handleChange} value={editing.yposition === undefined ? gameObject.localPosition.y : editing.yposition} type="number" name="yposition"/>
            </div>
            <div>
                <label htmlFor="rotation">Rotation</label>
                <input onBlur={handleLeave} onChange={handleChange} value={editing.rotation === undefined ? gameObject.localRotation : editing.rotation} type="number" name="rotation"/>
            </div>
            <div>
                <label htmlFor="xScale">X-Scale</label>
                <input onBlur={handleLeave} onChange={handleChange} value={editing.xscale === undefined ? gameObject.scale.w : editing.xscale} type="number" name="xscale"/>
                <label htmlFor="yScale">Y-Scale</label>
                <input onBlur={handleLeave} onChange={handleChange} value={editing.yscale === undefined ? gameObject.scale.h : editing.yscale} type="number" name="yscale"/>
            </div>
            <br/>
            {gameObject ? <AddComponent gameObject={gameObject} setSelectedGO={setSelectedGO} scripts={components}/> : null}
            {gameObject ? <AddSprite gameObject={gameObject} setSelectedGO={setSelectedGO} sprites={sprites}/> : null}
            <button onClick={handleClick}>Delete Game Object</button>
        </div>
    )
}

export default Inspector