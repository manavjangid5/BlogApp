import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    style={{
      background: "#fefadb",
      color: "#111",
      margin: "10px",
      borderRadius: "60px",
      width: "60px",
      height: "50px",
      fontSize: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
      cursor: "pointer"
    }}
    >Logout</button>
  )
}

export default LogoutBtn