import { useEffect, useState } from 'react';
const Modal = ({editComment, setEditComment, id}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const handleInputChange = (e) => {
        setUser({ ...user, text: e.target.value });
      };
      
      useEffect(() => {
        fetch(`http://127.0.0.1:8000/message/${id}/`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.log("Failed to retrieve");
            }
          })
          .then(data => {
            setLoading(false);
            setUser(data);
          });
      }, []);
    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:8000/message/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user),
        }).then(
            response => {
                if(response.ok){
                    console.log("Edited")
                    setEditComment(false)
                }
                else {
                    console.log("Failed to retrieve")
                }
            }
        )
    }
  return (
    <div className='modal'>
        {
        !loading &&
        <>
      <h3>Edit {user.author}'s Comment</h3>

        <form onSubmit={(e) => handleEdit(e)}>
            <label>
            <textarea value={user.text} onChange={(e) => handleInputChange(e)} rows={10}  style={{width:"100%"}}/>
            </label>
            <input type='submit' value='Submit' />
            <button onClick={() => setEditComment(false)}>Close</button>
        </form>
        </>
        }

    </div>
  );
};

export default Modal;