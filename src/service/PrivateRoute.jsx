import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({element}) => {
    const {isAuth} = useContext(AuthContext)

    return isAuth ? element : <Navigate to="/login"/>
}

export default PrivateRoute
