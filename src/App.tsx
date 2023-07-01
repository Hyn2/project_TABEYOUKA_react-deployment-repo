import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/layout/header'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'


const Layout = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}
localStorage.setItem('isLoggedIn', 'false');
function App() : JSX.Element {
  

  return (
    

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/main' element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    
  )
}

export default App
