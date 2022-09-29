import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Homepage from './pages/Homepage'
import MainContext from './context/MainContext'
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import Login from './pages/login'
import Register from './pages/register'
import './App.css';
const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
      .then(resp => {
        setUserInfo(resp.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin keliai */}
            {userInfo.role === 1 &&
              <Route path="admin">

              </Route>
            }
            {/* Vieši keliai */}
            <Route path="/" element={<Homepage />} />

            {userInfo.id &&
              <>

              </>
            }
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />



          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
