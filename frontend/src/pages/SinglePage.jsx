import {  useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005/api";


const SinglePage = () => {
    const {id}=useParams('id')
    const [post, setPost] = useState({})
    const getOnePost=async()=> {
        const response=await axios.get(`${API_URL}/post/${id}`)
        setPost(response.data.post)

        console.log(post.content)
    
    } 
    useEffect(() => {
        getOnePost();
      }, []);

  return (
    <div className=" justify-center mx-auto items-center  container px-4 flex flex-col gap-6">
        <h1 className="text-center text-4xl font-bold py-4 uppercase">{post.title}</h1>
        <img src={post.picture} alt={post.title} className="w-full" />
        <p className="text-2xl p-8 text-justify">
  {post.content}
        </p>
       
    </div>
  )
}

export default SinglePage
