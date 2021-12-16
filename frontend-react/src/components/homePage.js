import axios from 'axios';
import { useEffect, useState } from "react";
import './homePage.css';


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

    const picsToUpload = Object.entries(picsByAlbum).map(([key, value]) => {
        //KEY IS ALBUMNAME, VALUE IS AN OBJECT CONTAINING EVERY PIC DATA
        let arrayOfHtmlElements = [];
        Array.from(value).forEach(element => {
            let pathString = "http://localhost:3001/uploads/" + element.fileName;
            let imageID = element._id;
            return (arrayOfHtmlElements.push(<img src={pathString} key={imageID} class="pa-3" style={{ justifyContent: 'center', height: '500px', width: '500px' }} height="auto" />))
        });
        return (
            <div>
                <div>
                    <p className="homePageText">{key}</p>
                </div>
                <div className="album" >
                    <div >{arrayOfHtmlElements}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="gallery">
            <div className='gallery1stinnerdiv'>
                <div className='gallery2ndinnerdiv'>{picsToUpload}</div>                
            </div>
        </div>
    )
}

export default HomePage