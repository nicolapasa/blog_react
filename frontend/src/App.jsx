
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashBoard from './pages/DashBoard'
import IsPrivate from './components/IsPrivate'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import SinglePage from './pages/SinglePage'

function App() {


  return (
    <>
    <main className='bg-white roboto-regular'>
      <Navbar />
     
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<SinglePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard'  element={<IsPrivate > <DashBoard/> </IsPrivate>} />
        <Route path='/create'  element={<IsPrivate > <CreatePage/> </IsPrivate>} />
        <Route path='/edit/:id'  element={<IsPrivate > <EditPage/> </IsPrivate>} />
      </Routes>
      </main>  
    </>
  )
}

export default App
