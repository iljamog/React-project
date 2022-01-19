import axios from 'axios';
import { useEffect, useState } from "react";
import './homePage.css';
import CloseIcon from '@material-ui/icons/Close';
import CommentsSection from './comments'


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
            return (arrayOfHtmlElements.push(<div className='imageDiv' onClick={() => selectImage(pathString)}> <img alt="failed to load" src={pathString} key={imageID} style={{width: '100%'}}/> </div>))
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



    return (
        
        <div className="gallery">
            
            <div className={model? 'model open':'model'}>
                <div className='modelContainer'>
                    <img alt="failed to load" src={tempImageSource}/>
                    <CloseIcon onClick={() => setModel(false)}/>
                    <CommentsSection />
                </div>
            </div>

            {picsToDisplay}
        </div>
    )
}

export default HomePage