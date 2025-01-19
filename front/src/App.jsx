import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar.jsx'
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';


const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
      });
    }
  }, [location]);
  
  return(
    <>
    {/* <main> */}
      {/* <Container> */}
        {/* <React.Fragment> */}
            <Navbar/>
            <Outlet/> 
        {/* </React.Fragment> */}
      {/* </Container> */}
    {/* </main> */}
    </>
  )
}

export default App;