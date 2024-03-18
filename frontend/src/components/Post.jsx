import { Link } from "react-router-dom"
import cutTextAfterChars  from '../hooks/functions.js'

const Post = ({post}) => {
  return (
    <>

              <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={post.picture} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{post.title}</h2>
    <p>  {cutTextAfterChars(post.content, 200)}</p>
    <div className="card-actions justify-end">
     <Link className="btn btn-primary" to={`/${post._id}`} >read</Link>
    </div>
</div>
</div>
              </>
  )
}

export default Post
