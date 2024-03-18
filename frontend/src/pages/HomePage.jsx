import { useEffect, useState } from "react"
import axios from "axios";
import Post from "../components/Post";

const API_URL = "http://localhost:5005/api";

const HomePage = () => {
  const [posts, setPosts] = useState([])

  
  const getData=async()=>{
   const response=await axios.get(`${API_URL}/`)

   setPosts(response.data.posts)
   console.log(response.data.posts)
  }
 
 
   useEffect(() => {
 
          getData()
     
   }, [])
  return (
    <div className="container px-4">

  
    <div className="grid grid-cols-3">
        {
          posts.map((post)=>{
            
           return <>
           <div className="flex flex-col justify-center items-center ">
              <Post post={post} key={post._id} />
           </div>
            
              </>

          }
              

          )
        }
    </div>
    </div>
  )
}

export default HomePage
