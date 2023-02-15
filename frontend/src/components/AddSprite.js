import { useState } from "react";

function AddSprite({gameObject, setGameObject, sprites}){
    const [open, setOpen] = useState(false);
    const [components, setComponents] = useState(gameObject.components);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleClick = (e) => {
        const img = new Image(gameObject.scale.x * 10, gameObject.scale.y * 10)
        img.src = sprites[0]
        gameObject.sprite = img
        setGameObject({...gameObject})
        setOpen(!open);
        console.log(gameObject)
    }

    const displayComponents = components.map(component => {
        return (
            <div key={`Component-${component}`}>
                <label>{component}</label>
            </div>
        )})

    const displayDropDown = sprites.map(script => {
        return(
            <li className="menu-item">
                <button onClick={handleClick} name={script.name}>{script.name}</button>
            </li>
        )
    })

    return (
        <div className="dropdown">
            {displayComponents}
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
                <ul className="menu">
                    {displayDropDown}
                </ul>) 
            : null}
        </div>
    )
}

export default AddSprite