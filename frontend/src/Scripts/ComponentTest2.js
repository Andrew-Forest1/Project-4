import GameObject from "./GameObject"

// export function setProto(parent){
//     const component = new Component2()
//     Object.setPrototypeOf(parent, component)
//     return component
// }

export function assign(parent){
    const component = new Component2(parent)
    const temp = component.update
    const comp = Object.assign(component, parent)
    comp.update = function(){
        temp()
        parent.update()
    }
    return comp
}

export function Component(gameObject){
    return new Component2(JSON.parse(JSON.stringify(gameObject)))
}

export function Shallow(gameObject){
    return new Component2(gameObject)
}

class Component2 extends GameObject{
    constructor(gameObject){
        super(gameObject.globalPosition, gameObject.globalRotation, gameObject.scale, gameObject.shape)
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

    // parentUpdate(){
    //     this.super.update()
    // }
}