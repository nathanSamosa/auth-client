import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
    })
    let [newUser, setNewUser] = useState()
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    })
    let [newLogin, setNewLogin] = useState()
    let [loginErr, setLoginErr] = useState(null)
    

    const handleRegisterChange = e => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }
    const handleLoginChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }
    
    const handleRegister = async(e) => {
        e.preventDefault()
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerForm)
        }
        const res = await fetch("http://localhost:4000/register", fetchOptions)
        const data = await res.json()
        setNewUser(data.data)
    }
    const handleLogin = async(e) => {
        e.preventDefault()

        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginForm)
        }
        const res = await fetch("http://localhost:4000/login", fetchOptions)
        const data = await res.json()

        if(data.data) {
            setNewLogin(data.data)
            localStorage.setItem("JWT", data.data)
            setLoginErr(null)
            return
        }
        setLoginErr("username or password are incorrect")
    }

    return (
        <div className="App">
            <form className="App-form" onSubmit={e => handleRegister(e)}>
                <h1>Register:</h1>
                <label>
                    Username:
                    <input name="username" type="text" onChange={e => handleRegisterChange(e)} required></input>
                </label>
                <label>
                    Password:
                    <input name="password" type="password" onChange={e => handleRegisterChange(e)} required></input>
                </label>
                <button type="submit">Register</button>

                {newUser &&
                    <div className="new-user">
                        <h2>New user registered!</h2>
                        <h3>id: {newUser.id}</h3>
                        <h3>username: {newUser.username}</h3>
                        <h3>hash: {newUser.password}</h3>
                    </div>
                }
            </form>

            <form className="App-form" onSubmit={e => handleLogin(e)}>
                <h1>Login:</h1>
                <label>
                    Username:
                    <input name="username" type="text" onChange={e => handleLoginChange(e)} required></input>
                </label>
                <label>
                    Password:
                    <input name="password" type="password" onChange={e => handleLoginChange(e)} required></input>
                </label>
                <button type="submit">Register</button>

                {newLogin &&
                    <div className="new-user">
                        <h2>User logged in!</h2>
                        <h3>hash: {newLogin}</h3>
                    </div>
                }
                {loginErr &&
                    <h3>{loginErr}</h3>
                }
            </form>
        </div>
    );
}
