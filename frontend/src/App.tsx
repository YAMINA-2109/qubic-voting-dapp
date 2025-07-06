import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </ThemeProvider>
    </div>
  )
}

export default App
