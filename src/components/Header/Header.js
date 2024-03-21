import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className="py-1 shadow fixed top-0 left-0 right-0 z-50" style={{backgroundColor: "#59D5E0", backgroundImage: "linear-gradient(to right bottom, #f9ce34, #ee2a7b, #6228d7)"}}>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                style={{
                  background: "#fefadb",
                  color: "#111",
                  padding: "15px",
                  margin: "10px",
                  borderRadius: "10px",
                  width: "150px",
                  height: "50px",
                  fontSize: "20px",
                  fontFamily:"Cursive",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer"
                }}>
                
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header;