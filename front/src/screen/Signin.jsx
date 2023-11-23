import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";


export default function Signin() {
        return(
            <>
              <Box sx={{mt: 10}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
                    <Typography level="h3">Credentials</Typography>

                    {/* <TextField id="outlined-basic" label="Full Name" variant="outlined" /> */}
                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" /> */}
                    <TextField id="outlined-basic" label="Password" variant="outlined" />

                    <Button variant="contained" size="large">Sign In</Button>
                </Stack>

              </Box>
            </>
        )
}