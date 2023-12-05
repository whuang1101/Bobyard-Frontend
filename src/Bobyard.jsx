import { useEffect, useState } from "react";
import "./css/comment.css"
import Modal from "./Modal.jsx"
const CommentBoard = () => {
    const [comment, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [deleteComment, setDeleteComment] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [id, setId] = useState("");   
    useEffect(()=> {
        fetch(`http://127.0.0.1:8000/message/`).then(
            response => {
                if(response.ok){
                    console.log("Retrieved")
                    return response.json()
                }
                else {
                    console.log("Failed to retrieve")
                }
            }
        ).then(data => {
            setComments(data)
            setLoading(false)
        }
            
            )

    },[newComment, deleteComment, editComment])
    const postComment = () => { 
        const newMessage = {
            author:"Admin",
            text: newComment,
            likes: 100,
            date: new Date(),
            image: "https://www.w3schools.com/howto/img_avatar2.png"

        }
        fetch(`http://127.0.0.1:8000/message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newMessage),
        }).then(
            response => {
                if(response.ok){
                    newMessage.date = newMessage.date.toString()
                    setNewComment("")
                }
                else {
                    console.log("Failed to retrieve")
                }
            }
        )
    }
    const handleDelete = (id) => { 
        console.log(id)
        const newMessage = {
            author:"Admin",
            text: newComment,
            likes: 100,
            date: new Date(),
            image: "https://www.w3schools.com/howto/img_avatar2.png"

        }
        fetch(`http://127.0.0.1:8000/message/${id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newMessage),
        }).then(
            response => {
                if(response.ok){
                    setDeleteComment(!deleteComment)
                }
                else {
                    console.log("Failed to retrieve")
                }
            }
        )
    }

    return (
      <>
        <header> 
            <h1>Bobyard Comments</h1>
        </header>
        <main>
            {!loading && 
            <>
                <div>
                    <h2>
                        {comment.length} Comments
                    </h2>
                </div>
                <div className="comment-frame">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="image" className="profile-pic"/>
                    <textarea className="area" id="" cols="10" rows="1" onChange={(e) =>setNewComment(e.target.value)} value={newComment}></textarea>
                    <button className="submit" onClick={()=> postComment()}>Submit</button>
                </div>
            <div className="comments">
                    { comment.map((actual) => {
                        return (
                            <div className="comment-frame" key={actual.id}>
                            {actual.image ? <img src={actual.image} alt="image" className="profile-pic"/>
                            : <img src="https://www.w3schools.com/howto/img_avatar.png" alt="image" className="profile-pic"/>}
                            <div className="comment">
                                <h3>{actual.author} <span style={{fontSize:".75em"}}>{actual.date.slice(0,10)}</span></h3>
                                <p className="text">{actual.text}</p>
                                <div>
                                    <div className="third-row">
                                        <div className="likes">
                                            Likes: {actual.likes}
                                        </div>
                                        <div className="edit" onClick={() => {setEditComment(true), setId(actual.id)}}>
                                           Edit 
                                        </div>
                                        <div className="delete" style={{color:"red"}} onClick={() => handleDelete(actual.id)}>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    })}
                    
            </div>
            {
                editComment && <Modal editComment={editComment} id ={id} setEditComment={setEditComment}/>
            }
           </>
            }
        </main>
      </>
    )
  }
  
  export default CommentBoard
  