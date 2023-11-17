import { useContext } from "react";
import "./recipeCard.css";
import { useState } from "react";
import { UserPreferencesContext } from "../../context/UserPreferencesContext";

export function RecipeCard({ id, title, description, image }) {
  const {deleteRecipe} = useContext(UserPreferencesContext)

  //burada get ve post işlemlerinde kullandığımız gibi isLoading kullanırsak bir kartta silme işlemi yaparken diğer kartlarda da delete butonunda "Loading..." yazar. bunu engellemek için burada ayrı bir state yazılır. isLoading'in delete özelliği kullanılmaz.
  const [isDeletedLoading, setIsDeletedLoading] = useState(false)

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3 className="card-title">{title}</h3>
          <img className="card-img" src={image} alt="" />
        </div>
        <div className="flip-card-back">
          <p className="card-description">{description}</p>
          {/* metodu async yazma mantığımız => deleteRecipe önüne await yazmazsak işlemin gerçekleşmesini beklemeden setIsDeletedLoading false olur. bizim amacımız işlem bitince "Loading..." yazısının silinmesiydi. */}
          <button className="card-button" onClick={async() => {
            setIsDeletedLoading(true) 
            await deleteRecipe(id) 
            setIsDeletedLoading(false)}}> {isDeletedLoading.delete ? 'Loading...' : 'Delete'} </button>
        </div>
      </div>
    </div>
  );
}
