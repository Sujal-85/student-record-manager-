import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Container, Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteStudent = () => {
  const [regNo, setRegNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await axios.delete(`http://localhost:5000/api/student/delete/${regNo}`);
      setSuccess(true);
      setRegNo('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting student');
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = () => {
    if (!regNo) {
      setError('Please enter a registration number');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Delete Student
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Student deleted successfully!
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDialog}
              disabled={loading || !regNo}
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : 'Delete Student'}
            </Button>
          </Box>
        </Box>

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the student with registration number: {regNo}?
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default DeleteStudent;