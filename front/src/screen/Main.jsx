import React, { useState, useEffect } from "react"
import Header from "../components/Header.jsx";
import AllPosts from "../components/AllPosts.jsx";
import Footer from "../components/Footer.jsx";
import SearchBox from '../components/SearchBox.jsx'

export default function Main() {
    return(
        <>
            <Header/>
            <SearchBox/>
            <AllPosts/>
            <Footer/>        
        </>
    )
}       