import { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  Alert, 
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const GetStudent = () => {
  const [regNo, setRegNo] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!regNo) {
      setError('Please enter a registration number');
      return;
    }

    setLoading(true);
    setError('');
    setStudent(null);
    
    try {
      const res = await axios.get(`https://student-record-manager-kj5k.onrender.com/api/student/get/${regNo}`);
      setStudent(res.data);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Student not found');
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Find Student
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !regNo}
            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            sx={{ minWidth: 150 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Box>

        {searched && !student && !loading && (
          <Alert severity="info" sx={{ mb: 3 }}>
            No student found with this registration number
          </Alert>
        )}

        {student && (
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Student Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Registration No:</strong> {student.registrationNo}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Name:</strong> {student.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Class:</strong> {student.class}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Subject 1 IA Marks:</strong> {student.subject1_IAMarks}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default GetStudent
