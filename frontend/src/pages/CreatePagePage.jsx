import { useState , useContext } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

const API_URL = "http://localhost:5005/api";


 


const CreatePagePage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [picture  , setPicture  ] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const onEditorInputChange = (newValue, editor) => {
        console.log(newValue)
        setContent(editor.getContent({ format: "text" }))
    
    }

    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
    e.preventDefault()
    
    setIsDisabled(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("picture", picture);
  
    try {
      const response = await axios.post(`${API_URL}/page/create`, formData);
      if (response.status === 201) {
               navigate('/')
      
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
    <input type="text" placeholder="title" className="input input-bordered w-full max-w-xs"
 onChange={(e)=>setTitle(e.target.value)} 
 />
 
 <Editor
 apiKey="bvd9c7l707a61o6ecrwwobfnj29yan9dsr1xgl52wshmyk98"
 onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
 onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}

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

export default CreatePagePage