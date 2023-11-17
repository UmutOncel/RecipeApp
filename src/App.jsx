import './App.css'
import { NavigationBar } from './components/navigationBar/NavigationBar'
import { useContext } from 'react'

import { UserPreferencesContext } from './context/UserPreferencesContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage/HomePage';
import { AddRecipePage } from './pages/AddRecipePage/AddRecipePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { RecipesPage } from './pages/RecipesPage/RecipesPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './service/PrivateRoute';

function App() {
  const {theme} = useContext(UserPreferencesContext)

  return (
    <div className={theme}>
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar/>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/recipes' element={<PrivateRoute element={ <RecipesPage/> } />} />
              <Route path='/addNewRecipe' element={<PrivateRoute element={ <AddRecipePage/> } />} />
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/settings' element={<PrivateRoute element={ <SettingsPage/> } />} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App

/*
AMAÇ: Sanal bir API yaratıp oraya "GET" isteği atarak tarifleri çekmek. "POST" isteği atarak yeni tarifleri bunun içine kaydetmek.

1. Daha önce "fakeRecipes" dizimiz App.jsx içindeydi ve bu diziyi parametre olarak RecipeList component'i içine yollayıp ekranda yazdırıyorduk.

2. Artık oluşturmak istediğimiz yapı şu şekilde:
  a. sanal bir API oluşturacağız. "json-server" yüklenir => "npm install -g json-server" (g:global)

  b. fakeRecipes dizisini bu API içine alacağız. proje klasörü içinde "db.json" dosyası oluşturulur. fakeRecipes dizisi "json" nesnesi olarak buraya alınır. json nesnesi yapmak için dizi scope'lar içine yazılır. const silinir. fakeRecipes adı tırnak içine alınır ve = yerine : koyulur. 
  
  c. bu dosyaya bağlı sanal API ayağa kaldırılır => "json-server --watch db.json --port 3001"
  bu işlemde hata aldığım için PowerShell'i açıp içine "Set-ExecutionPolicy RemoteSigned" ve "Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force" kodlarını yazdım.

  d. buraya istek atarak verilere ulaşacağız. ayağa kaldırma işleminde oluşturulan link istek atarken kullanılır. istek atmak için "axios" kullanılır => "npm install axios"

  e. yeni tarifleri de bu API içine kaydedeceğiz. 
*/
