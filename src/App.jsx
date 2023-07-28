import './App.css'
import { Home } from './Components/home.component'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { User } from './Components/User.component'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/user-profile/:login" element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
