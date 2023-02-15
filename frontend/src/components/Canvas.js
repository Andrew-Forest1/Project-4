import React from 'react'
import useCanvas from './useCanvas'
import { useState } from 'react'
import { drawTriangle, drawRectangle, drawCircle, positionToCanvas } from '../Scripts/DrawingFunctions'

function Canvas({props, gameObjects, setGameObjects, setSelectedGameObject, play, playableObjects}){  
    //const [canvasRect, setCanvasRect] = useState(document.getElementsByClassName("myCanvas")[0].getBoundingClientRect()); //canvas needs to load first
    const [canvasScale, setCanvasScale] = useState({w: 500, h:500});
    const [input, setInput] = useState({
        key: '',
        type:''
    });

    // const [key, setKey] = useState({});

    // document.addEventListener("keydown", (e) => {
    //     //console.log(key)
    //     setKey(current => {return {...current, [e.key]:true}})
    // })

    // document.addEventListener("keyup", (e) => {
    //     setKey(current => {return {...current, [e.key]:false}})
    // })

    const draw = (ctx, frameCount, gameObjects) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        gameObjects.forEach(gameObject => {
            if(gameObject.sprite !== ""){
                ctx.drawImage(gameObject.sprite, gameObject.globalPosition.x - gameObject.scale.w * 5, positionToCanvas(gameObject.globalPosition.y + gameObject.scale.h * 5), gameObject.scale.w * 10, gameObject.scale.h * 10)
            }else{
                if(gameObject.shape === 'triangle'){
                    drawTriangle(gameObject, ctx)
                }else if(gameObject.shape === 'rectangle'){
                    drawRectangle(gameObject, ctx)
                }
                else{
                    drawCircle(gameObject, ctx)
                }
            }
        });
    }

    const handleClick = (e) => {
        const rect = document.getElementsByClassName("myCanvas")[0].getBoundingClientRect()
        const mousePos = {
            x: e.clientX - rect.x,
            y: positionToCanvas(e.clientY - rect.y)
        }

        const selectedGameObjects = gameObjects.filter(gameObject => {
            return gameObject.selectGameObject(mousePos)
        })

        selectedGameObjects.length !== 0 ? setSelectedGameObject(selectedGameObjects[0]) : setSelectedGameObject(null)
    }

    const handleController = (e) => {
        //console.log(e)
        setInput({key:e.key, type: e.type})
    }

    //ctx.canvs.width = 500

    const update = (gameObjects) => {
        if(play){
            //debugger
            gameObjects.forEach(object => object.update(input))
        }
    }

    const { options, ...rest } = props
    const { context, ...moreConfig } = options
    const canvasRef = useCanvas(draw, update, play,  !play ? gameObjects : playableObjects, canvasScale)
  
    return <canvas onClick={handleClick} onKeyDown={handleController} onKeyUp={handleController} onkey tabIndex={play ? 1 : 0} className='myCanvas' ref={canvasRef} {...rest}/>
}

export default Canvas