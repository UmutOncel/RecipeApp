import { useContext } from 'react'
import { RecipeCard } from '../recipeCard/RecipeCard'
import './recipeList.css'
import { UserPreferencesContext } from '../../context/UserPreferencesContext'

export function RecipeList() {
  const {recipes, isLoading} = useContext(UserPreferencesContext)

  return (
    <div>
      <h2 className='card-list-title'>Recipe List</h2>
      <div className='card-list'>
          {isLoading.read && <p>Loading...</p>}     {/* sol taraf true ise sağ tarafı çalıştır. */}
          {recipes.map(recipe => <RecipeCard {...recipe} key={recipe.id}/>)}    {/* RecipeCard component'i içinde direkt olarak title vs. kullanmak için recipe spread edip yollanır. bu tarz yazımda isimlendirmeye (recipe={recipe}) gerek yoktur. scope içinde ({...recipe}) yollanır. */}
      </div>
    </div>
  )
}
