import { useContext, useState } from "react"
import './addNewRecipe.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserPreferencesContext } from "../../context/UserPreferencesContext"

export function AddNewRecipe() {
    const {addRecipeToList, isLoading} = useContext(UserPreferencesContext)


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    const [titleErr, setTitleErr] = useState(false)
    const [descriptionErr, setDescriptionErr] = useState(false)
    const [imageErr, setImageErr] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        setTitleErr(false)
        setDescriptionErr(false)
        setImageErr(false)
        if(title.trim() && description.trim() && image.trim())
        {
          //API kullandığımızdan verileri kaydetmek için POST isteği atarız. ilk parametre API linki, ikinci parametre oluşturacağımız obje olur. (objenin ID'sini json-server kendisi oluşturur.)
          //objeyi post et ve dönen response'un data'sını (verimizi) listeye ekle. bu listeyi App.jsx'te RecipeList compenent'i alsın ve ekranda göstersin. böyleye yeni eklenen tarifi görmek için sayfayı yenilemeye gerek kalmasın.

          addRecipeToList({title, image, description})
        
          toast.success('Your recipe has been successfully created.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            style: {
              background: '#F4F4F4',
              color: 'black',
              fontSize: '15px',
              fontWeight: 'bold',
              fontFamily: "'Bitter', serif",
              padding: '10px',
              borderRadius: '1rem',
              boxShadow: '0 0 15px 0 black'
            }
          })
        
          setTitle("")
          setDescription("")
          setImage("")
        } else {
          !title.trim() && setTitleErr(true)
          !description.trim() && setDescriptionErr(true)
          !image.trim() && setImageErr(true)
        }
    }
    
  return (
    <form className="form-submit" onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Recipe Title" onChange={event => setTitle(event.target.value)} value={title}/>
          {titleErr && <p className="error-text">Title cannot be empty!</p>}
        </div>

        <div>
          <textarea placeholder="Recipe Description" onChange={event => setDescription(event.target.value)} value={description}></textarea>
          {descriptionErr && <p className="error-text">Description cannot be empty!</p>}
        </div>

        <div>
          <input type="text" placeholder="Image URL" onChange={event => setImage(event.target.value)} value={image}/>
          {imageErr && <p className="error-text">Image URL cannot be empty!</p>}
        </div>

        <button className="button-submit" type="submit">{isLoading.add ? 'Loading...' : 'Add Recipe'}</button>

        <ToastContainer/>
    </form>
  )
}
