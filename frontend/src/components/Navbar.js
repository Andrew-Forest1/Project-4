import { useState } from 'react';

function Navbar({user}){
    const [more, setMore] = useState(false)

    return (
        <nav className="navbar" id="navbar">
            <a className="site-title" href="/scenes" onClick={()=>{}}>Spriter</a>
            <ul>
                <button className='more2' onClick={() => setMore(current => !current)}>{user.username}</button> {
                    more ?
                    <div className='moreBox2'>
                        <li className="site" onClick={()=>{}}><a href="scenes">Browse Posts</a></li>
                        <li className="site" onClick={()=>{}}><a href="logout">Logout</a></li>
                        <li className="site" onClick={()=>{}}><a href="user_scenes">Account</a></li>
                    </div>
                :
                null
                }
            </ul>
        </nav>
    )
}

export default Navbar