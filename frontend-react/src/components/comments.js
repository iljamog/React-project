import { useEffect, useState, React} from "react";
import axios from 'axios';

function CommentsSection(){

    const [comments, setComments] = useState([]);
    const [id, setId] = useState([]);

    const [user, setUser] = useState();
    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, [user]);

    const commentsSectionContent = () => {
        if(user){
            return(
                <div>
                    <p>TERETERE</p>
                </div>
            )
        }else{
            return(

                <div>
                    Log in to comment.
                </div>
            )
        }
    }
    
const getCommentFromServer = useEffect(() => {
        axios.get("http://localhost:3000/api/comments/", { params: { id: id } })
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    setComments(res.data)
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (

        <div className='comments'>
            {commentsSectionContent()}
        </div>
    )
}

export default CommentsSection