import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <>
      <CircularProgress color='success'/>
    </>
    // <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'center' }}>
    //   <Box sx={{textAlign:'center', alignContent:'center', alignItems:'center', verticalAlign:'middle'}}>
    //     {/* <p>Loading, Please wait...</p> */}
    //     <CircularProgress color='success'/>
    //   </Box>
    // </Box>
  );
}