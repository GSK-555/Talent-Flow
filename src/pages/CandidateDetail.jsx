import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Paper, TextField, Button, Divider } from '@mui/material'

export default function CandidateDetail() {
  const { id } = useParams()
  const [cand, setCand] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [note, setNote] = useState('')

  useEffect(() => {
    fetch(`/api/candidates`)
      .then((r) => r.json())
      .then((d) => setCand(d.items.find((x) => x.id === id)))

    fetch(`/api/candidates/${id}/timeline`)
      .then((r) => r.json())
      .then((d) => setTimeline(d))
  }, [id])

  const addNote = () => {
    // notes are local-only in this simplified prototype
    alert('Note attached (render only): ' + note)
    setNote('')
  }

  if (!cand) return <div>Loading...</div>
  return (
    <Box sx={{ p: 3, maxWidth: '720px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {cand.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {cand.email} — <strong>{cand.stage}</strong>
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Timeline
      </Typography>
      {timeline.length === 0 && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          No timeline events found.
        </Typography>
      )}
      {timeline.map((t, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(t.ts).toLocaleString()}
          </Typography>
          <Typography>{t.text}</Typography>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      <TextField
        label="Attach note (supports @mentions render-only)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={addNote}>
        Add Note
      </Button>
    </Box>
  )
}
