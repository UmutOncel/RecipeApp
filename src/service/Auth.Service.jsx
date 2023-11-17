import axios from 'axios'

//API'ye istek atılmak için yazdık.
const AuthService = {
    login : async (email, password) => {
        const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
            "email": email,
            "password": password
        })

        if(response.data.access_token){
            localStorage.setItem("user", JSON.stringify(response.data))     //yerel depo
        }

        return response.data    //access token ve refresh token'ı döndürür.
    },
    
    logout : () => {
        localStorage.removeItem("user")
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem("user"))     //js nesnesine çeviyor.
    }
}

export default AuthService
