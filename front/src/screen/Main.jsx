import React, { useState, useEffect } from "react"
import Header from "../components/Header.jsx";
import AllPosts from "../components/AllPosts.jsx";
import Footer from "../components/Footer.jsx";
import SearchBox from '../components/SearchBox.jsx'

export default function Main() {
    // const [post, setPost] = useState([])
    // const [img, setImg] = useState('')
    // const [isLoading, setIsLoading] = useState(null)

    // // first way
    // const fetchPosts = async() =>{
    //     try {
    //         const data = await axios.get('/api/post')
    //         const res = data
    //         console.log(res.data)
    //         setPost(res.data)
    //         return res.data
            
    //     } catch (err) {
    //         console.log('something went wrong: ', err.message)
    //     }
    //   }
      
    //   useEffect(() => {
    //       fetchPosts()
    //   }, [])

    
    // // second way
    
    // // It Works... dont delete it or modify it, please..!
    // // useEffect(() => {
    // //     const fetchData = async() => {
    // //         const {data} = await axios.get('/api/post')
    // //         console.log(data)
    // //     }
    // //     fetchData()
    // // }, [])


      

    return(
    <>
       
        <Header/>
        <SearchBox/>
        <AllPosts/>
        <Footer/>        
    </>
    
    
    // <>
    //     <Container 
    //         style={{
    //             marginTop: '20px', 
    //             width:'100%',
    //             display:'flex', flexDirection:'column', gap:'20px'
    //         }} >
                
    //         <Box>
    //             <h1>Hello there!</h1>
    //             <p>Welcome to my portfolio!</p>
    //         </Box>

    //         <BoxCard/>
    //     </Container>
    // </>
    )
}       