import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Container, Alert, CircularProgress } from '@mui/material';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    registrationNo: '',
    name: '',
    class: '',
    subject1_IAMarks: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const res = await axios.post('https://student-record-manager-kj5k.onrender.com/api/student/add', formData);
      setSuccess(true);
      setFormData({
        registrationNo: '',
        name: '',
        class: '',
        subject1_IAMarks: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Add New Student
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Student added successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Registration Number"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Subject 1 IA Marks"
            name="subject1_IAMarks"
            type="number"
            value={formData.subject1_IAMarks}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
            required
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              sx={{ px: 4 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Student'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddStudent;
