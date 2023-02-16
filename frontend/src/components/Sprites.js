import { useState, useEffect } from "react";

function Sprites({setDrag}){
    const [sprites, setSprites] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/sprites`)
        .then(resp => resp.json())
        .then(data => { 
            setSprites(data)
        })
    }, []);
    
    const displaySprites = sprites.map(sprite => {
        return <img src={sprite.image_url} alt={sprite.name} onDragStart={() => {setDrag(sprite)}}/> 
    })

    return (
        <div>
            {displaySprites}
        </div>
    )
}

export default Sprites