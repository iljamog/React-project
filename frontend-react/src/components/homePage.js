import axios from 'axios';
import { useEffect, useState } from "react";
import './homePage.css';
import CloseIcon from '@material-ui/icons/Close';
import ModalImage from "react-modal-image";



function HomePage() {
    const [picsFromServer, setpicsFromServer] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/home/")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    setpicsFromServer(res.data)
                }
            })
            .catch(err => console.log(err));
    }, []);

    const picsByAlbum = picsFromServer.reduce((prev, pic) => {
        const key = pic['albumName'];
        if (!prev[key]) {
            prev[key] = [];
        }
        prev[key].push(pic);
        return prev;
    }, {});

    const [model, setModel] = useState(false)


    const picsToUpload = Object.entries(picsByAlbum).map(([key, value]) => {
        //KEY IS ALBUMNAME, VALUE IS AN OBJECT CONTAINING EVERY PIC DATA
        let arrayOfHtmlElements = [];
        let cssClassNameForImageContainer;

        Array.from(value).forEach(element => {
            let pathString = "http://localhost:3001/uploads/" + element.fileName;
            let imageID = element._id;
            return (arrayOfHtmlElements.push(
                <div className='imageDiv'>
                    <ModalImage
                        small={pathString}
                        key={imageID}
                        medium={pathString}
                        className="open-image-modal"
                        hideDownlaod={true}
                    />
                </div>
                )
            )
        });

        if (value.length === 1) {
            cssClassNameForImageContainer = 'imageContainerFor1image';
        } else if (value.length === 2) {
            cssClassNameForImageContainer = 'imageContainerFor2image';
        } else {
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
            <div className={model ? 'model open' : 'model'}>
                <img alt="failed to load" src={''} />
                <CloseIcon onClick={() => setModel(false)} />
            </div>
            {picsToUpload}
        </div>
    )
}

export default HomePage