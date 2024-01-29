import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'

const Navbar = () => {
    let data = useCart()
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate()
    let location = useLocation()
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div className='navbar'>
            <div className='mainlogo' ><a href='/'>GoFood</a></div>
            <div className='navitems'>
                <div><Link id={`${location.pathname === '/' ? "active" : "notactive"}`} to="/">HOME</Link></div>
                {(!localStorage.getItem('token')) ? <div className='loggedout'>
                    <div><Link id={`${location.pathname === '/login' ? "active" : "notactive"}`} to="/login">LOGIN</Link></div>
                    <div><Link id={`${location.pathname === '/createuser' ? "active" : "notactive"}`} to="/createuser">SIGN-UP</Link></div>
                </div> : <div className='loggedin' >
                    <div><Link id={`${location.pathname === '/orders' ? "active" : "notactive"}`} to="/myOrder">ORDERS</Link></div>
                    <div onClick={() => { setCartView(true) }}>
                        <Link id={`${location.pathname === '/cart' ? "active" : "notactive"}`} to="" >CART
                            <span id="badge">
                                <svg height="1rem" width="1rem">
                                    <circle cx="5" cy="5" r="1rem" fill="red" />
                                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="0.8rem">
                                        {data.length}
                                    </text>
                                </svg>
                            </span>
                        </Link>
                    </div>
                    {cartView ? <Modal onClose={() => { setCartView(false) }} ><Cart></Cart></Modal> : null}
                    <div onClick={handleLogOut} ><Link id={`${location.pathname === '/logout' ? "active" : "notactive"}`} to="">LOG-OUT</Link></div>
                </div>}
            </div>
        </div>
    )
}

export default Navbar