import GameObject from "./GameObject"

export function Component(gameObject){
    const deepCopy = JSON.parse(JSON.stringify(gameObject))
    deepCopy.sprite = gameObject.sprite
    return new Component2(deepCopy)
}

export function Shallow(gameObject){
    return new Component2(gameObject)
}

class Component2 extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape, gameObject.sprite)
        this.prop2 = "Component 2 prop"
        this.count = 0
        this.nextObject = false
    }

    update(input){
        this.globalPosition.x += 5 * Math.cos(this.count)
        this.globalPosition.y += 5 * Math.sin(this.count)
        this.count += .1
        if(this.nextObject){
            this.nextObject.update()
        }
    }
}