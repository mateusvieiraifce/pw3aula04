import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Login from './components/Login'
import Usuario from './pages/Usuario'
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userLogged, setUserLogged] = useState(false)
  
  const renderPage=()=>{
    console.log("rebderuzad"+currentPage)
    if (currentPage=="clientes"){
      return <Clientes/>
    }
    if (currentPage=="produtos"){
      return <Produtos/>
    }
    if (currentPage=="usuarios"){
      return <Usuario/>
    }
  }

  return (
    <>

     <div className='app'>
      {!userLogged ? (<>

       <Login setUserLogger={setUserLogged}></Login>

      </>) : (<>

      <Sidebar setCurrentPage={setCurrentPage}></Sidebar>   
        <div className="main-content">
        {renderPage()}
      </div>

      
      </>)}
      
     </div>
       
    </>
  )
}

export default App
