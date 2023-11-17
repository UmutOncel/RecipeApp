import { useContext, useEffect, useState } from "react"
import { UserPreferencesContext } from "../../context/UserPreferencesContext"
import './theme.css'
import axios from "axios"

export function Theme() {
    const {theme, toggleTheme} = useContext(UserPreferencesContext)
    const [user, setUser] = useState({})

    useEffect(() => {
      const getUserProfile = async () => {
        const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).access_token}`
          }
        }).then(response => setUser(response.data))
      }

      getUserProfile()
    }, [])

  return (
    <div className="theme">
        <div className="theme-div">
          <label className="theme-label">Theme</label>
          <button className="theme-btn" onClick={toggleTheme}> {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'} </button>
        </div>
        <label className="user-info">User Information</label>
        <div className="user-profile">
          <img className="user-image" src={user.avatar} alt="" />
          <p className="user-text"> <b>Name:</b> {user.name}</p>
          <p className="user-text"> <b>Role:</b> {user.role}</p>
          <p className="user-text"> <b>Email:</b> {user.email}</p>
        </div>
    </div>
  )
}
