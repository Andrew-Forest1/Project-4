class GameObject{
    constructor(position, rotation, scale, shape, sprite, id){
        this.localPosition = position
        this.globalPosition = position
        this.localRotation = rotation
        this.globalRotation = rotation
        this.scale = scale
        this.selected = false
        this.components = []
        this.sprite = sprite
        this.shape = shape
        this.id = id
        //console.log(this)
    }

    selectGameObject(mousePosition) {
        if(this.distance(this.globalPosition, mousePosition) < this.scale.w * 10){
            return true
        }else{
            return false
        }
    }

    distance(pos1, pos2){
        return Math.sqrt(Math.pow((pos1.x - pos2.x),2) + Math.pow((pos1.y - pos2.y),2))
    }

    runComponents(){

    }

    update(input){

    }
}

export default GameObject