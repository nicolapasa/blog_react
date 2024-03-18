import { useEffect, useState } from "react"
import { Link,  useNavigate } from "react-router-dom"
const API_URL = "http://localhost:5005/api";
import axios from "axios";


const DashBoard = () => {
  const [posts, setPosts] = useState([])
  const [pages, setPages] = useState([])
  const navigate=useNavigate()
  
  const getData=async()=>{
   const response=await axios.get(`${API_URL}/`)

   setPosts(response.data.posts)

  }

  const getPages=async()=>{
    const response=await axios.get(`${API_URL}/page/`)
 
    setPages(response.data.pages)

   }
 
  const handleDelete =async(id)=>{
   try {
    const res= await axios.delete(`${API_URL}/delete/${id}`)
    console.log(res)
    navigate('/')
   } catch (error) {
    console.log(error)
   }
    

  }
  
  const handleDeletePage =async(id)=>{
    try {
     const res= await axios.delete(`${API_URL}/page/delete/${id}`)
     console.log(res)
     navigate('/')
    } catch (error) {
     console.log(error)
    }
     
 
   }

 
   useEffect(() => {
 
          getData()
          getPages()
     
   }, [])
  return (
    <div>
    
      <div className="overflow-x-auto container px-12">
      <Link to={'/create'} className="btn bg-primary text-white" >Create Post</Link>
      <Link to={'/page/create'} className="btn bg-primary text-white" >Create Page</Link>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
  
        <th>Title</th>
        <th>Content</th>
        <th>Picture</th>
        <th colSpan={2}>Actions</th>
      </tr>
    </thead>
    <tbody>
     {
      posts.map((post)=>{

         return (
          <>
          <tr>
     
        <td>{post.title}</td>
        <td>{post.content}</td>
        <td><img src={post.picture} alt="" className="w-12" /></td>
        <td>
          <Link to={`/edit/${post._id}`} className="btn bg-blue-700 text-white">EDIT</Link>
        </td>
        <td>
          <button onClick={()=>handleDelete(post._id)} className="btn bg-red-600 text-white">DELETE</button>
        </td>
      </tr>
          </>
         )

      })
     }
      
    
   
    </tbody>
  </table>

  <table className="table">
    {/* head */}
    <thead>
      <tr>
  
        <th>Title</th>
        <th>Content</th>
        <th>Picture</th>
        <th colSpan={2}>Actions</th>
      </tr>
    </thead>
    <tbody>
     {
     pages.map((page)=>{

         return (
          <>
          <tr>
     
        <td>{page.title}</td>
        <td>{page.content}</td>
        <td><img src={page.picture} alt="" className="w-12" /></td>
        <td>
          <Link to={`/edit/${page._id}`} className="btn bg-blue-700 text-white">EDIT</Link>
        </td>
        <td>
          <button onClick={()=>handleDeletePage(page._id)} className="btn bg-red-600 text-white">DELETE</button>
        </td>
      </tr>
          </>
         )

      })
     }
      
    
   
    </tbody>
  </table>
</div>
    </div>
  )
}

export default DashBoard
