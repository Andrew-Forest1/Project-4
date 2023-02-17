import GameObject from "../Scripts/GameObject"

function Scene({scene, setRenderScene}){
    const onClickEdit = (e) => {
        window.location.href = `http://localhost:3001/user_scenes/${scene.id}`
        setRenderScene(scene)
    }

    return(
        <div className='SceneCard'>
            <h2>{`${scene.name} by ${scene.user.username}`}</h2>
            {scene.image ? <img src={scene.image} width={300}/> : null}
            <div className="SceneButtons">
                <button onClick={onClickEdit}>View</button>
            </div>
        </div>
    )
}

export default Scene