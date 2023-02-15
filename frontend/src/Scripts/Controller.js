import GameObject from "./GameObject"

export function Component(gameObject){
    const deepCopy = JSON.parse(JSON.stringify(gameObject))
    deepCopy.sprite = gameObject.sprite
    return new Controller(deepCopy)
}

export function Shallow(gameObject){
    return new Controller(gameObject)
}

class Controller extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.count = 0
        this.nextObject = false
    }

    movementControls(input) {
        if(input.type === 'keydown'){
            switch (input.key) {
                case 'w':
                    this.globalPosition.y += 1
                    break;
    
                case 's':
                    this.globalPosition.y -= 1
                    break;
    
                case 'a':
                    this.globalPosition.x -= 1
                    break;
    
                case 'd':
                    this.globalPosition.x += 1
                    break;
            
                default:
                    break;
            }
        }
    }

    //updates object each frame
    update(input){
        this.movementControls(input)

        //do not remove
        if(this.nextObject){
            this.nextObject.update()
        }
    }
}