import GameObject from "./GameObject"

export function Component(gameObject){
    return new Component3(JSON.parse(JSON.stringify(gameObject)))
}

export function Shallow(gameObject){
    return new Component3(gameObject)
}

class Component3 extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape)
        this.prop2 = "Component 3 prop"
        this.count = 0
        this.nextObject = false
    }

    //updates object each frame
    update(input){
        this.globalRotation += 2
        this.count += .1

        //do not remove
        if(this.nextObject){
            this.nextObject.update()
        }
    }
}