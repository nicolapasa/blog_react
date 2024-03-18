import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = "http://localhost:5005/api";
import { Editor } from "@tinymce/tinymce-react";
const EditPage = () => {
    const navigate=useNavigate()
    const {id}=useParams('id')
    const { user } = useContext(AuthContext); 
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [picture  , setPicture  ] = useState('')
    const [owner, setOwner] = useState(user._id);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
  

    const onEditorInputChange = (newValue, editor) => {
 
      setContent(editor.getContent({ format: "text" }))
  }

    const getOnePost=async()=> {
        const response=await axios.get(`${API_URL}/post/${id}`)
        setTitle(response.data.post.title)

        setContent(response.data.post.content)
        setOwner(response.data.post.user._id)
        
    
    } 
    useEffect(() => {
        getOnePost();
      }, []);


    const handleSubmit=async(e)=>{
    e.preventDefault()
    
    setIsDisabled(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("picture", picture);
    formData.append("owner", owner);
  
    try {
      const response = await axios.put(`${API_URL}/edit/${id}`, formData);
      if (response.status === 201) {
               navigate('/')
              console.log(response)
      
    } else {
      setErrorMessage(response.data.message);
    }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
    
    }
    return (
      <div>

         <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
         <h1>Edit Post</h1>
         <input type="text" placeholder="title" className="input input-bordered w-full max-w-xs"
         value={title}
      onChange={(e)=>setTitle(e.target.value)} 
      />
       <Editor
    apiKey="bvd9c7l707a61o6ecrwwobfnj29yan9dsr1xgl52wshmyk98"
    onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
    onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}
    value={content}
/>
     <input type="file" placeholder="title" className="input input-bordered w-full max-w-xs"
        onChange={(event) => {
          setPicture(event.target.files[0]);
        }}
      />
      <button className="btn" type="submit">Save</button>
          </form> 
  
      </div>
    )
  }
export default EditPage