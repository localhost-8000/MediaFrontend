import "./modal.css";
import { CircularProgress } from "@material-ui/core";

import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import uploadImage from "../../firebase_app/firebaseUpload";


export default function Modal({ visibility, setPreviewOpened, imageFile, imgType }) {

    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    
    const handleUpload = () => {
        setLoading(true);
        uploadImage(imageFile, user._id, async (imageUrl) => {
            try {
                await axios.post("/users/" + imgType + "/upload", {
                    userId: user._id,
                    imageUrl: imageUrl
                }).then((res) => {
                    if(res.status == 200) {
                        window.location.reload();
                    } else {
                        alert("Uploading image failed!");
                    }
                })
            } catch(err) {
                alert("Unknown error occured");
            }
        })
    }
    
    if(!visibility) {
        return null;
    }
    return (
        <div className="modal" onClick={() => setPreviewOpened(false)}>
            <div className="imagePreviewContainer" onClick={ e => e.stopPropagation()}>
                <div className="imageContainer">
                    <img src={URL.createObjectURL(imageFile)} alt="img"/>
                </div>
                <div className="buttonContainer">
                    <button onClick={handleUpload}>
                        {loading && (<CircularProgress id="loader" size="19"/>)} Upload</button>
                    <button onClick={() => setPreviewOpened(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
