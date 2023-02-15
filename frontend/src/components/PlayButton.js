import GameObject from "../Scripts/GameObject"

function PlayButton({gameObjects, play, setPlay, setPlayableObjects}){
    const handleClick = async () => {
        if(!play){
            // const { addComponent } = await import('./Test.js')
            // const components = gameObjects.map(gameObject => {
            //     addComponent(gameObject)
            // })
            const playObjects = await Promise.allSettled(gameObjects.map( async (gameObject) => {
                if(gameObject.components.length === 0){
                    const deepCopy = JSON.parse(JSON.stringify(gameObject))
                    return new GameObject(deepCopy.globalPosition, deepCopy.globalRotation, deepCopy.scale, deepCopy.shape, gameObject.sprite)
                }else{
                    let finalGameObject = null
                    for(const component of gameObject.components){
                        //working code for 1 component
                        // const { addComponent, Component } = await import(`./${component}`)
                        // const newGameObject = addComponent(gameObject)
                        // const newComponent = Component()
                        if(!finalGameObject){
                            const { assign, Component } = await import(`../Scripts/${component}`)
                            finalGameObject = await Component(gameObject)
                        }else{
                            let temp = finalGameObject
                            while(temp.nextObject){
                                temp = temp.nextObject
                            }
                            const { Shallow, Component } = await import(`../Scripts/${component}`)
                            temp.nextObject = await Shallow(finalGameObject)
                            // temp = component
                        }
                        //     const newGameObject = addComponent(gameObject)
                        //     const newComponent = Component()
                        // }else{

                        // }
                    }
                    return finalGameObject
                }
            }))
            //debugger
            const playableObjects = playObjects.map(playObject => playObject.value)
            setPlay(current => !current)
            setPlayableObjects(playableObjects)
        }else{
            setPlay(current => !current)
        }
    }

    return <button onClick={handleClick}>{play ? "Stop" : "Play"}</button>
}

export default PlayButton