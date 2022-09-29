import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Homepage from './Homepage'

//Admino komponentai

//Vartotojo komponentai


//Autentifikacijos komponentai
import Login from './pages/Login'
import Register from './pages/Register'

//Kontekstas
import MainContext from './context/MainContext'

//Baziniai komponentai
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
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



          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
