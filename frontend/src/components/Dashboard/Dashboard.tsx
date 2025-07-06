import { Container, Typography, Button } from '@mui/material'
import { Logout } from '@mui/icons-material'
import styles from './Dashboard.module.css'

interface DashboardProps {
  onLogout: () => void
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  return (
    <Container className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Dashboard
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={onLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </div>
        
        <Typography variant="h6" className={styles.welcome}>
          Welcome! You are logged in.
        </Typography>
      </div>
    </Container>
  )
}

export default Dashboard