import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material'
import { Add, Delete, Poll, AccessTime } from '@mui/icons-material'

interface Poll {
  id: string
  title: string
  options: string[]
  votes: number[]
  isActive: boolean
  createdAt: Date
}

const VotingDashboard = () => {
  const [polls, setPolls] = useState<Poll[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newPollTitle, setNewPollTitle] = useState('')
  const [newPollOptions, setNewPollOptions] = useState<string[]>(['', ''])

  const handleCreatePoll = () => {
    if (newPollTitle.trim() && newPollOptions.every(opt => opt.trim())) {
      const newPoll: Poll = {
        id: Date.now().toString(),
        title: newPollTitle,
        options: newPollOptions,
        votes: new Array(newPollOptions.length).fill(0),
        isActive: true,
        createdAt: new Date()
      }
      setPolls([...polls, newPoll])
      setNewPollTitle('')
      setNewPollOptions(['', ''])
      setOpenDialog(false)
    }
  }

  const handleVote = (pollId: string, optionIndex: number) => {
    setPolls(polls.map(poll => 
      poll.id === pollId 
        ? { ...poll, votes: poll.votes.map((vote, i) => i === optionIndex ? vote + 1 : vote) }
        : poll
    ))
  }

  const handleDeletePoll = (pollId: string) => {
    setPolls(polls.filter(poll => poll.id !== pollId))
  }

  const addOption = () => {
    setNewPollOptions([...newPollOptions, ''])
  }

  const removeOption = (index: number) => {
    if (newPollOptions.length > 2) {
      setNewPollOptions(newPollOptions.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const updated = [...newPollOptions]
    updated[index] = value
    setNewPollOptions(updated)
  }

  const getTotalVotes = (poll: Poll) => poll.votes.reduce((sum, votes) => sum + votes, 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Voting Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Create Poll
        </Button>
      </Box>

      {polls.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Poll sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No polls yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first poll to get started
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {polls.map((poll) => {
            const totalVotes = getTotalVotes(poll)
            return (
              <Grid item xs={12} md={6} key={poll.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {poll.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={poll.isActive ? 'Active' : 'Closed'}
                          color={poll.isActive ? 'success' : 'default'}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePoll(poll.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                      <AccessTime sx={{ mr: 1, fontSize: 16 }} />
                      <Typography variant="caption">
                        Created: {poll.createdAt.toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Total votes: {totalVotes}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      {poll.options.map((option, index) => {
                        const percentage = totalVotes > 0 ? (poll.votes[index] / totalVotes) * 100 : 0
                        return (
                          <Box key={index} sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2">{option}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {poll.votes[index]} ({percentage.toFixed(1)}%)
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={percentage}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                        )
                      })}
                    </Box>

                    {poll.isActive && (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {poll.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outlined"
                            size="small"
                            onClick={() => handleVote(poll.id, index)}
                          >
                            Vote: {option}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Poll</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Poll Title"
            fullWidth
            variant="outlined"
            value={newPollTitle}
            onChange={(e) => setNewPollTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Options:
          </Typography>
          <List>
            {newPollOptions.map((option, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <TextField
                  size="small"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  fullWidth
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removeOption(index)}
                    disabled={newPollOptions.length <= 2}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            startIcon={<Add />}
            onClick={addOption}
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
          >
            Add Option
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreatePoll} variant="contained">
            Create Poll
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default VotingDashboard