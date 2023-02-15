import GameObject from "../Scripts/GameObject"

function PlayButtonTest({gameObjects, play, setPlay, setPlayableObjects}){
    const handleClick = async () => {
        if(!play){
            const playObjects = await Promise.allSettled(gameObjects.map( async (gameObject) => {
                if(gameObject.components.length === 0){
                    const deepCopy = JSON.parse(JSON.stringify(gameObject))
                    return new GameObject(deepCopy.globalPosition, deepCopy.globalRotation, deepCopy.scale, deepCopy.shape)
                }else{
                    let finalGameObject = null
                    for(const component of gameObject.components){
                        if(!finalGameObject){
                            debugger
                            const { assign, Component } = await import(`${component}`)
                            finalGameObject = await Component(gameObject)
                        }else{
                            debugger
                            let temp = finalGameObject
                            while(temp.nextObject){
                                temp = temp.nextObject
                            }
                            const { Shallow, Component } = await import(`${component}`)
                            temp.nextObject = await Shallow(finalGameObject)
                        }
                    }
                    return finalGameObject
                }
            }))
            debugger
            const playableObjects = playObjects.map(playObject => playObject.value)
            setPlay(current => !current)
            setPlayableObjects(playableObjects)
        }else{
            setPlay(current => !current)
        }
    }

    return <button onClick={handleClick}>Play</button>
}

export default PlayButtonTest