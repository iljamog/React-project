import axios from 'axios';
import { useEffect, useState } from "react";
import './homePage.css';
import CloseIcon from '@material-ui/icons/Close';


function HomePage() {

    const [picsFromServer, setpicsFromServer] = useState([]);
    const [model, setModel] = useState(false)
    const [tempImageSource, setTempImageSource] = useState('')
    

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
            return (arrayOfHtmlElements.push(<div className='imageDiv' onClick={() => {selectImage(pathString);getCommentsFromServer(pathString)}}> <img alt="failed to load" src={pathString} key={imageID} style={{width: '100%'}}/> </div>))
        });

        if (value.length === 1) {
            cssClassNameForImageContainer = 'imageContainerFor1image';
        } else if (value.length === 2) {
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
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user)
    const firstName = userData.firstName
    const lastName = userData.lastName

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
                        <h5>From: {element.firstName} {element.lastName}</h5>
                        <p> {element.comment} </p>
                    </div> 
                )
            }
            return(commentArray)

        }else{
            return(<p>Sry no comments</p>)
        }
        
        
    }

    let clearInput = () => { 
        document.getElementsByClassName("comment-input")[0].value='';
      }

    const commentsSectionContent = () => {
        if(user){
            return(
                <div>
                    {createCommentHtmlElements()}
                    <input className='comment-input' placeholder='Add comment' onChange={(e) => setComment(e.target.value)} type='text' required />
                    <button className='comment-button' type='primary' onClick={() =>{ addComment(); clearInput() }} >Submit</button>
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