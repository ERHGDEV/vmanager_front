import './App.css'
import DashboardAdmin from './components/DashboardAdmin'
import Header from './components/Header'
import Login from './components/Login'
import { useState, useEffect } from 'react'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok) {
        setCurrentUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        setErrorMessage('')
        setShowNotification(false)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error logging in: ', error)
      setErrorMessage('Usuario o contraseña incorrectos')
      setShowNotification(true)
    }
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const handleLogout = () => {
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  if (!currentUser) {
    return (
      <div className='min-h-screen bg-cyan-950 text-gray-100 p-8'>

        <Header />

        {showNotification && (
          <div className="fixed top-4 right-8 bg-red-500 text-white p-4 rounded shadow-lg">
            {errorMessage}
          </div>
        )}

        <Login onLogin={handleLogin} />

    </div>
    )
  }

  return (
    <div className='min-h-screen bg-cyan-950 text-gray-100 p-8'>

      <Header />

      <button
        onClick={handleLogout}
        className='
          fixed top-8 right-8 bg-gray-100 text-cyan-950 
          px-4 py-2 rounded hover:bg-white focus:outline-none'
      >
        Cerrar sesión
      </button>

      {currentUser.role === 'admin' ? (
        <DashboardAdmin token={token} />
      ) : (
        <h2>Hola user</h2>
      )}

    </div>
  )
}

export default App
