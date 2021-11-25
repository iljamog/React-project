import axios from 'axios';
import { useState } from "react";


function UploadFile() {
    const [selectedFile, setSelectedFile] = useState("");
    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
    }

    function uploadHandler() {
        console.log("munad");
        axios.post('');
    }

    return (
        <div className="App">
            <input type="file" onChange={fileSelectedHandler} />
            <button onClick={uploadHandler}>Upload</button>
        </div>
    )
}

export default UploadFile