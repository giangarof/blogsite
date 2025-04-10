import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar.jsx'
import ReactGA from "react-ga4";
import Footer from "./components/Footer.jsx";
const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview event on location change
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return(
    <>
    {/* <main> */}
      {/* <Container> */}
        {/* <React.Fragment> */}
            <Navbar/>
            <Outlet/> 
            <Footer/>  
        {/* </React.Fragment> */}
      {/* </Container> */}
    {/* </main> */}
    </>
  )
}

export default App;