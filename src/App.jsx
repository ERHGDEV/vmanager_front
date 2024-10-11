import './App.css'
import DashboardAdmin from './components/DashboardAdmin'
import Header from './components/Header'
import Login from './components/Login'
import { useState, useEffect } from 'react'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState('error')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
  }, [])

  const handleNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
  }

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

        handleNotification('Inicio de sesión exitoso', 'success')

      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error logging in: ', error)

      handleNotification('Usuario o contraseña incorrectos', 'error')
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

  return (
    <div className='min-h-screen max-w-6xl mx-auto bg-cyan-950 text-gray-100 p-8'>
      <Header isLogged={currentUser} onLogout={handleLogout} />

      {showNotification && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 
          ${notificationType === 'error' ? 
            'bg-red-500 text-white' : 
            'bg-green-500 text-black'} 
           px-4 py-2 rounded shadow-lg`}
        >
          {notificationMessage}
        </div>
      )}

      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        currentUser.role === 'admin' ? (
          <DashboardAdmin 
            handleNotification={handleNotification}
            token={token} />
        ) : (
          <h2>Hola user</h2>
        )
      )}
    </div>
  )
}

export default App
