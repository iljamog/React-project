import axios from 'axios';
import { useState } from "react";


function UploadFile() {
    const [albumName, setAlbumName] = useState();
    const [files,setFiles] = useState([]);
    

    function uploadHandler() {
        const uploadData = new FormData(); 
        uploadData.append("albumName", albumName);
        for (let i = 0; i < files.length; i++) {
            uploadData.append("file", files[i]);  
            console.log(files[i]);     
        }
        
        axios.post("http://localhost:3000/api/upload/upload", uploadData )
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    return (
        <div className="App">
            <div className="upload">
            
                <label htmlFor="file">File</label>
                <input 
                type="file" 
                id="file"
                name="file" 
                multiple
                onChange={ event=> {
                    const filesToUpload = event.target.files;
                    setFiles(filesToUpload);
                }}/>

                <label htmlFor="albumName">Album name</label>
                <input 
                type="text" 
                id="albumName" 
                onChange={ event=> {
                    const {value} = event.target;
                    setAlbumName(value);
                }}/>

            </div>
            <button onClick={uploadHandler}>Upload</button>
        </div>
    )
}

export default UploadFile