import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  Alert, 
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

const UpdateStudent = () => {
  const [regNo, setRegNo] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', 
    class: '', 
    subject1_IAMarks: '' 
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [studentExists, setStudentExists] = useState(false);

  // Fetch student data when registration number changes
  useEffect(() => {
    const fetchStudent = async () => {
      if (!regNo) {
        setStudentExists(false);
        return;
      }

      setFetching(true);
      setError('');
      
      try {
        const res = await axios.get(`https://student-record-manager-kj5k.onrender.com/api/student/get/${regNo}`);
        setFormData({
          name: res.data.name || '',
          class: res.data.class || '',
          subject1_IAMarks: res.data.subject1_IAMarks || ''
        });
        setStudentExists(true);
      } catch (err) {
        setStudentExists(false);
        setFormData({ name: '', class: '', subject1_IAMarks: '' });
      } finally {
        setFetching(false);
      }
    };

    const timer = setTimeout(() => {
      fetchStudent();
    }, 500); // Debounce to avoid rapid API calls

    return () => clearTimeout(timer);
  }, [regNo]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUpdate = async () => {
    if (!regNo) {
      setError('Please enter a registration number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await axios.put(`http://localhost:5000/api/student/update/${regNo}`, formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Update Student Information
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Student updated successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Registration Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
              disabled={loading}
              helperText={fetching ? "Searching for student..." : ""}
            />
          </Grid>
          
          {studentExists && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Edit Student Details
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Subject 1 IA Marks"
                  name="subject1_IAMarks"
                  type="number"
                  value={formData.subject1_IAMarks}
                  onChange={handleChange}
                  inputProps={{ min: 0, max: 100 }}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  disabled={loading || !studentExists}
                  startIcon={loading ? <CircularProgress size={20} /> : <UpdateIcon />}
                  size="large"
                >
                  {loading ? 'Updating...' : 'Update Student'}
                </Button>
              </Grid>
            </>
          )}

          {!studentExists && regNo && !fetching && (
            <Grid item xs={12}>
              <Alert severity="warning">
                No student found with this registration number
              </Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateStudent;
