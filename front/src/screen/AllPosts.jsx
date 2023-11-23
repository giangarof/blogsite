import React, { useState, useEffect } from "react"
import axios from "axios"
export default function AllPosts() {
    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(null)

    // first way
    const fetchPosts = async() =>{
        try {
            const data = await axios.get('/api/post')
            const res = data
            console.log(res.data)
            setPost(res.data)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
      }
      
      useEffect(() => {
          fetchPosts()
      }, [])

    
    // second way
    
    // It Works... dont delete it or modify it, please..!
    // useEffect(() => {
    //     const fetchData = async() => {
    //         const {data} = await axios.get('/api/post')
    //         console.log(data)
    //     }
    //     fetchData()
    // }, [])
      

    return(
        // <>
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* Render or use 'post' */}
                    {post.map((item) => (
                        <div key={item._id}>{item.title},{item._id}</div>
                    ))}
                </div>
            )}

        </div>
        // </>
    )
}