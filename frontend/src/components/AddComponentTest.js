import { useState } from "react";

function AddComponentTest({gameObject, setGameObject, scripts}){
    const [open, setOpen] = useState(false);
    const [components, setComponents] = useState(gameObject.components);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleClick = (e) => {
        const s = scripts
        debugger
        gameObject.components.push(e.target.name)
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

    const displayDropDown = scripts.map(script => {
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

export default AddComponentTest