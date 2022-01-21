import axios from 'axios';
import { useEffect, useState } from "react";
import './homePage.css';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function HomePage() {

    const [picsFromServer, setpicsFromServer] = useState([]);
    const [model, setModel] = useState(false)
    const [tempImageSource, setTempImageSource] = useState('')

    const user = localStorage.getItem('user')
    let firstName;
    let lastName;
    let email;
    let userData;

    if(user){
        userData = JSON.parse(user)
        firstName = userData.firstName
        lastName = userData.lastName
        email = userData.email;
    }

    useEffect(() => {
        axios.get("http://localhost:3000/home/")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    setpicsFromServer(res.data)
                }
            })
            .catch(err => console.log(err));
    }, []);

    const separatePicsByAlbum = picsFromServer.reduce((prev, pic) => {
        const key = pic['albumName'];
        if (!prev[key]) {
            prev[key] = [];
        }
        prev[key].push(pic);
        return prev;
    }, {});
    const selectImage = (pathString) => {
        setTempImageSource(pathString)
        setModel(true)
    }

    const picsToDisplay = Object.entries(separatePicsByAlbum).map(([key, value]) => {
        //KEY IS ALBUMNAME, VALUE IS AN OBJECT CONTAINING EVERY PIC DATA
        let arrayOfHtmlElements = [];
        let cssClassNameForImageContainer;
        Array.from(value).forEach(element => {
            let pathString = "http://localhost:3001/uploads/" + element.fileName;
            let imageID = element._id;
            if(email === 'admin@admin.ee'){
                return (arrayOfHtmlElements.push(
                <div className='imageDiv' onClick={() => {selectImage(pathString);getCommentsFromServer(pathString)}}>
                    <img alt="failed to load" src={pathString} key={imageID} style={{width: '100%'}}/>
                    <div className='deleteIconWrapper' onClick={() => {deleteImage(element.fileName);setModel(false)}} >
                        <DeleteForeverIcon />
                    </div>
                    
                </div>))
            }else{
                return (arrayOfHtmlElements.push(
                    <div className='imageDiv' onClick={() => {selectImage(pathString);getCommentsFromServer(pathString)}}>
                        <img alt="failed to load" src={pathString} key={imageID} style={{width: '100%'}}/>
                    </div>))
            }
            
        });
        if (value.length === 1) {
            cssClassNameForImageContainer = 'imageContainerFor1image';
        }else if (value.length === 2) {
            cssClassNameForImageContainer = 'imageContainerFor2image';
        }else {
            cssClassNameForImageContainer = 'imageContainer';
        }
        return (
            <div className='albumContainer'>
                <div>
                    <p className='albumName'>{key}</p>
                </div>
                <div className={cssClassNameForImageContainer}>
                    {arrayOfHtmlElements}
                </div>
            </div>
        )
    })

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    

    async function deleteImage (fileName){
        axios.delete(`http://localhost:3000/home/delete/${fileName}`).then(()=> {
            console.log('success')
        }).catch(err => console.log(err));
        axios.get("http://localhost:3000/home/")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    setpicsFromServer(res.data)
                }
            })
            .catch(err => console.log(err));
        
    }

    async function addComment(){
        if(comment.length>0){
            const commentData = {
            firstName: firstName,
            lastName: lastName,
            comment: comment,
            fileName: tempImageSource
            }
            const res = await fetch('http://localhost:3000/api/comments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData),
            })
            setComment('')
            getCommentsFromServer(tempImageSource)
            createCommentHtmlElements()
            const returnData = await res.json()
            let errors = ''
            if (returnData.error) {
                errors = returnData.error
                console.log(errors);
            } 
        }
    }

    function getCommentsFromServer(imagePath) {
        axios.get('http://localhost:3000/api/comments', { params: { fileName: imagePath } })
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    setComments(res.data)
                }
            })
            .catch(err => console.log(err));
    }

    function createCommentHtmlElements(){
        if(comments.length>0){
            let commentArray = []
            for (let index = 0; index < comments.length; index++) {
                const element = comments[index];
                commentArray.push(
                    <div className='singleComment'> 
                        <h5>{element.firstName} {element.lastName} says:</h5>
                        <p> {element.comment} </p>
                    </div> 
                )
            }
            return(commentArray)
        }else{
            return(<p style={{
                fontSize: "1rem",
                fontWeight: 1.5,
                lineHeight: 1.5,
                color: "#292b2c",
                padding: "0 2em"
                }} >
                  No comments yet.
                </p>)
        }
    }

    let clearInput = () => { 
        let input = document.getElementsByClassName("comment-input");
        if(input.length>0){
            input[0].value='';
        }
      }

    const commentsSectionContent = () => {
        if(user){
            return(
                <div className='wrapper'>
                    <div className='inputDiv'>
                        <textarea className='comment-input' placeholder='Add comment' onChange={(e) => setComment(e.target.value)} required />
                        <button className='comment-button' type='primary' onClick={() =>{ addComment(); clearInput() }} >Submit</button>
                    </div>
                    <div className='commentsWrapper'>
                        {createCommentHtmlElements()}
                    </div>
                </div>
            )
        }else{
            return(
                <div className='pleaseLogin'>
                    Log in to comment.
                </div>
            )
        }
    }

    return (
        <div className="gallery">
            <div className={model? 'model open':'model'}>
                <div className='modelContainer'>
                    <img alt="failed to load" src={tempImageSource}/>
                    <CloseIcon onClick={() => {setModel(false); setComment(''); setComments([]);clearInput();}} />
                    <div className='comments'>
                        {commentsSectionContent()}
                    </div>
                </div>
            </div>
            {picsToDisplay}
        </div>
    )
}

export default HomePage