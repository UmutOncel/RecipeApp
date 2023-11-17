import { useNavigate } from 'react-router-dom'
import './login.css'
import { useContext, useState } from "react"
import { AuthContext } from '../../context/AuthContext'

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {login} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          await login(email, password)
          navigate("/")
        } catch (error) {
          alert("Login failed!")
        }
    }

  return (
    <form className='login-form-submit' onSubmit={handleLogin}>
        <input className='login-input' type="email" placeholder="Enter your email" onChange={event => setEmail(event.target.value)}/>
        <input className='login-input' type="password" placeholder="Enter your password" onChange={event => setPassword(event.target.value)}/>
        <button className='login-button' type='submit'>Login</button>
    </form>
  )
}
