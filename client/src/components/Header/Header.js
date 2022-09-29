import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import axios from 'axios'

import './Header.css'

const Header = () => {
    const { userInfo, setUserInfo, setAlert } = useContext(MainContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('/api/users/logout/')
            .then(resp => {
                setUserInfo({})
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/')
            })
    }

    return (
        <header>
            <div className="container">
                <span className="left">
                    <input type="text" placeholder='Search' />

                </span>
                <span className="middleLogo"><img src="https://imgs.search.brave.com/H7e2ekzcVwZ_8g0tLw3C_d6FejUmLGhGAhMJOD4rNwU/rs:fit:768:245:1/g:ce/aHR0cDovL2NuZ2Yu/b3JnL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L0dvRnVu/ZE1lLUxvZ28tNzY4/eDI0NS5qcGc" alt="none" /></span>
                <span className="right">
                    <ul>
                        <li> <Link
                            to="/login"
                        >
                            Login
                        </Link></li>
                        <li> <Link
                            to="/register"
                        >
                            Register
                        </Link></li>
                        {userInfo.role === 0 &&
                            <li>
                                <Link
                                    to="/orders"
                                    className="nav-link px-2"
                                >
                                    Užsakymai
                                </Link>
                            </li>
                        }{userInfo.role === 0 &&
                            <li>
                                <Link
                                    to="/orders"

                                >
                                    New Campaign
                                </Link>
                            </li>
                        }
                    </ul>
                </span>
            </div>
        </header>
    )
}

export default Header