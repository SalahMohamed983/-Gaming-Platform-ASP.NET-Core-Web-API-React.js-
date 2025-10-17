import { Route, Routes } from 'react-router-dom'
import './App.css'
import MyForm from './Components/Form/MyForm'
import GamesPage from './Components/GamesPage/GamesPage'
import Header from './Components/Header'
import Home from './Components/Home'
import SideBar from './Components/SideBar'
import GameCard from './Components/GameCard/GameCard'
import { ToastProvider } from './Components/ExtraComponent/ToastContext'

function App() {


function FormRoute({ children })
{
return(
       <div className="flex">
<SideBar />
      <div className="min-h-screen bg-gradient-to-r from-[#2b0036] via-[#5b005b] to-[#9b1d9b] w-full md:w-[85%]">
<Header />
     <div className=' px-2'>
{children}
</div>
 </div>

</div>
);
}

  return (
    <> 
    <ToastProvider>

      <Routes>
        <Route path="/*"
         element={
           <FormRoute>
           <Routes>
        <Route path='/' element={<Home />} />
           <Route path="/GamesPage" element={<GamesPage />} />
           <Route path="/FavoritsPage" element={<GamesPage IsFavoritPage={true} />} />
           <Route path="/GameCard/:Id" element={<GameCard />} />
           </Routes>
         </FormRoute>
         }/>
         
        <Route path="/Register" element={<MyForm Register={true} />} />
        <Route path="/Login" element={<MyForm Register={false}/>} />
      </Routes>
    
           </ToastProvider>
    </>
    )
}

export default App
