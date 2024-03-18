import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = "http://localhost:5005/api";

const SinglePagePage = () => {

    const [page, setPage] = useState({})
  const {id}=  useParams("id")
  const getOnePage=async()=>{
     
   const response=await axios.get(`${API_URL}/page/${id}`)

   setPage(response.data.page)

} 
  useEffect(() => {
    
 
     getOnePage()

  }, [])
  
 
  return (
    <div className="container flex flex-col justify-center items-center mx-auto">
     <h1 className=" text-6xl font-bold py-4">{page.title}</h1> 
     <div className="flex justify-around">
     <p className="text-2xl p-4">
        {page.content}
     </p>
     <img src={page.picture} alt="" className="w-[50%]" />
   
     </div>
  
    </div>
  )
}

export default SinglePagePage
