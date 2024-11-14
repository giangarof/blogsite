import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'2rem', marginBottom:'2rem' }}>
      <Box sx={{textAlign:'center'}}>
        <CircularProgress color='success'/>
        <p>Loading, Please wait...</p>
      </Box>
    </Box>
  );
}