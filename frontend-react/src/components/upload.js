import axios from 'axios';
import { useState } from "react";
import './upload.css'


function UploadFile() {
    const [albumName, setAlbumName] = useState();
    const [files, setFiles] = useState([]);

    function uploadHandler() {
        const uploadData = new FormData();
        uploadData.append("albumName", albumName);
        for (let i = 0; i < files.length; i++) {
            uploadData.append("file", files[i]);
        }
        axios.post("http://localhost:3000/api/upload/upload", uploadData)
            .then(window.location.reload())
            .catch(err => console.log(err));
    }

    return (
    <div className="form-body">
        <div className="mainuploadform">
            <div className="uploadform">
                

                <label className="uploadlabel" htmlFor="albumName">Album name</label>
                <input className="uploadinput" placeholder="Enter album name" type="text" id="albumName"
                    onChange={event => {
                        const { value } = event.target;
                        setAlbumName(value);
                    }} />
                <label className="upperuploadlabel" htmlFor="file">Choose file(s)</label>
                <input  className="fileinput" type="file" id="file" name="file" multiple
                    onChange={event => {
                        const filesToUpload = event.target.files;
                        setFiles(filesToUpload);
                    }} />
                <button className="uploadbutton" onClick={uploadHandler}>Upload</button>
            </div>
        </div>
    </div>
    )
}

export default UploadFile