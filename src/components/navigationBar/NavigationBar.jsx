import { useContext, useState } from 'react'
import './navigationBar.css'
import { UserPreferencesContext } from '../../context/UserPreferencesContext'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const ThemeSlider = () => {
  const {theme, toggleTheme} = useContext(UserPreferencesContext)

  //tema dark ise true döner.
  const [isToggled, setIsToggled] = useState(theme === 'dark')

  const handleToggle = () => {
    setIsToggled(!isToggled)
    toggleTheme()
  }

  return(
    <div className={`slider-container ${isToggled ? 'dark' : 'light'}`} onClick={handleToggle}>
      <div className='slider-button'>
      </div>
    </div>
  )
}

export function NavigationBar() {
  const {isAuth, logout} =useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className='flex-header'>
        <h2> <FontAwesomeIcon icon={faUtensils} /> Recipe Platform</h2>
        <nav>
            <ul>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/recipes">Recipes</Link> </li>
                <li> <Link to="/addNewRecipe">Add Recipe</Link> </li>
                <li> <Link to="/settings">Settings</Link> </li>
                <button className='nav-button' onClick={isAuth ? handleLogout : handleLogin}> {isAuth ? "Logout" : "Login"} </button>
                <ThemeSlider/>
            </ul>
        </nav>
    </header>
  )
}
