import { useState } from 'react'
import { Card, CardContent, TextField, Button, Typography, Alert, Container } from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import users from '../../data/users.json'
import styles from './Login.module.css'

interface LoginProps {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <Container className={styles.container}>
      <div className={styles.loginWrapper}>
        <Card className={styles.loginCard}>
          <CardContent className={styles.cardContent}>
            <div className={styles.header}>
              <LoginIcon className={styles.loginIcon} />
              <Typography variant="h4" component="h1" className={styles.title}>
                Login
              </Typography>
              <Typography variant="body2" className={styles.subtitle}>
                Sign in to your account
              </Typography>
            </div>

            {error && (
              <Alert severity="error" className={styles.error}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.textField}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordField}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className={styles.submitButton}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}

export default Login