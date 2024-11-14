import React, { useState, useEffect } from "react"
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Meta from "../components/Meta.jsx";

export default function Main() {
    return(
        <>  
            <Meta />
            <Header/>
            <Footer/>        
        </>
    )
}       