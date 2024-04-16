import React, { useRef, useState } from 'react'
import "./login.css"
import { Cancel, Room } from '@mui/icons-material'
import axios from "axios";

export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const res = await axios.post("/users/login", user);
            console.log('login', res);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false);
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className='loginContainer'>
            <div className='logo'>
                <Room />LakruwanPin
            </div>
            <form action="" onSubmit={handleSubmit}>
                <input type='text' placeholder='username' ref={nameRef} />
                <input type='password' placeholder='password' ref={passwordRef} />
                <button className='loginBtn'>Login</button>
                {error && <span className="failure">Something went wrong!</span>}
            </form>
            <Cancel className='loginCancel' onClick={() => setShowLogin(false)} />
        </div>
    )
};
