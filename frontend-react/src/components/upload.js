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
            console.log(files[i]);
        }
        axios.post("http://localhost:3000/api/upload/upload", uploadData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    return (
    <div class="form-body">
        <div class="mainuploadform">
            <div class="uploadform">
                <label class="upperuploadlabel" htmlFor="file">Choose file(s) for upload</label>
                <input class="uploadinput" type="file" id="file" name="file" multiple
                    onChange={event => {
                        const filesToUpload = event.target.files;
                        setFiles(filesToUpload);
                    }} />

                <label class="uploadlabel" htmlFor="albumName">Album name</label>
                <input class="uploadinput" type="text" id="albumName"
                    onChange={event => {
                        const { value } = event.target;
                        setAlbumName(value);
                    }} />
                <button class="uploadbutton" onClick={uploadHandler}>Upload</button>
            </div>
        </div>
    </div>
    )
}

export default UploadFile