import { createContext ,useState, useEffect } from "react";
import axios from 'axios'

export const UserPreferencesContext = createContext()

export const UserPreferencesProvider = ({children}) => {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    const [recipes, setRecipes] = useState([])
  
    //get ve post için ayrı parametreler vermezsek örneğin GET isteği yaparken "Add Recipe" butonunda da "Loading..." yazardı. bu şekilde özelleştirmiş olduk.
    const [isLoading, setIsLoading] = useState({
        read: false,
        add: false
    })

    //dependency array içi boş olduğu için sayfa açıldığında veya yenilendiğinde useEffect tetiklenir. tetiklenince içindeki callback function'ı çağırır. (dependency array'in içinde parametre olsaydı o parametre değişince useEffect hook'u tetiklenirdi.)
    useEffect(() => {
        const getRecipes = async () => {
        try {
            setIsLoading(prevIsLoading => ({...prevIsLoading, read:true}))

            const response = await axios.get("http://localhost:3001/fakeRecipes")
            .then(response => setRecipes(response.data))      //GET isteğinden bir response döner. bu response'un   data'sı (title, image vb.) "setRecipes" aracılığı ile "recipes" içine atanır. 

            setIsLoading(prevIsLoading => ({...prevIsLoading, read:false}))
        } catch (error) {
          console.error('There was an error fetching the recipes! ', error)
        }
      }
      getRecipes()
    }, [])

    //useEffect ile bir kereliğine mahsus server'daki veriler "recipes" içine atılır. daha sonra "addRecipeToList" fonksiyonu ile mevcut veriler üzerine yeni veri eklenir.
    //normalde eklenen kartı görmek için sayfayı yenilemek gerekiyordu. bu metot sayesinde "Add Recipe" butonuna bastıktan sonra sayfayı yenilemeye gerek kalmadan eklenen kart gözükür. listenin mevcut elemanları spread ile yayılır üzerine yeni tarif eklenir. (previous state)
    //ÇALIŞMA MANTIĞI => bu sepet AddNewRecipe component'ine gider. burada yeni tarifi alır ve geri buraya gelir. burada bu tarfi "recipes" içine atar. recipes'te RecipeList component'ine yollanır ve ekranda tarifler yazdırılır. bu işlemlerin App.jsx içinde yazılma mantığı da budur. çünkü AddNewRecipe ve RecipeList component'leri aynı seviyede çocuklardır. o yüzden onların parent'i olan App.jsx içinde yazılır.
    // const addRecipeToList = (newRecipe) => {
    //   setRecipes((prevRecipes) => [...prevRecipes, newRecipe])
    // }

    const addRecipeToList = async ({title, description, image}) => {
        setIsLoading(prevIsLoading => ({...prevIsLoading, add:true}))

        const response = await axios.post('http://localhost:3001/fakeRecipes', {title, description, image})
        //response başarılı ise
        if(response.status === 201){
        setRecipes(prevRecipeList => [...prevRecipeList, response.data])
        }

        setIsLoading(prevIsLoading => ({...prevIsLoading, add:false}))
    } 

    const deleteRecipe = async (id) => {
        const response = await axios.delete(`http://localhost:3001/fakeRecipes/${id}`)
        //sayfayı yenilemeye gerek kalmadan silinen kartın ekrandan yok olması için aşağıdaki kodları yazdık.
        if(response.status === 200){
        const updatedRecipes = recipes.filter(recipe => recipe.id !== id)
         setRecipes(updatedRecipes)
        }
    }

    return (
        <UserPreferencesContext.Provider value={{theme, toggleTheme, addRecipeToList, isLoading, recipes, deleteRecipe}}>
            {children}
        </UserPreferencesContext.Provider>
    )
}
