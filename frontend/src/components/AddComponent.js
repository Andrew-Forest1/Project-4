import { useState } from "react";

function AddComponent({gameObject, setGameObject}){
    const [open, setOpen] = useState(false);
    const [components, setComponents] = useState(gameObject.components);

    const handleOpen = () => {
      setOpen(!open);
    };

    const handleClick = (e) => {
        if(e.target.name === 'test1'){
            //setComponents(current => [...current, './ComponentTest1.js'])
            gameObject.components.push('ComponentTest1.js')
        }else if(e.target.name === 'test2'){
            //setComponents(current => [...current, './ComponentTest2.js'])
            gameObject.components.push('ComponentTest2.js')
        }else if(e.target.name === 'test3'){
            //setComponents(current => [...current, './ComponentTest2.js'])
            gameObject.components.push('ComponentTest3.js')
        }else{
            //setComponents(current => [...current, './ComponentTest2.js'])
            gameObject.components.push('Controller.js')
        }
        setGameObject({...gameObject})
        setOpen(!open);
    }

    const displayComponents = components.map(component => {
        return (
            <div key={`Component-${component}`}>
                <label>{component}</label>
            </div>
        )})

    return (
        <div className="dropdown">
            {displayComponents}
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
                <ul className="menu">
                <li className="menu-item">
                    <button onClick={handleClick} name="test1">Test 1</button>
                </li>
                <li className="menu-item">
                    <button onClick={handleClick} name="test2">Test 2</button>
                </li>
                <li className="menu-item">
                    <button onClick={handleClick} name="test3">Test 3</button>
                </li>
                <li className="menu-item">
                    <button onClick={handleClick} name="controller">Controller</button>
                </li>
                </ul>) 
                : null}
        </div>
    )
}

export default AddComponent