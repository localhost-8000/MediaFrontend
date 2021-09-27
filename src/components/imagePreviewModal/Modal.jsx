import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import uploadImage from "../../firebase_app/firebaseUpload";
import axios from "axios"

import "./modal.css"

export default function Modal({visibility, setPreviewOpened, imageFile}) {
    const {user} = useContext(AuthContext);
    
    const handleUpload = () => {
        uploadImage(imageFile, user._id, async (imageUrl) => {
            try {
                await axios.post("/users/profile/upload", {
                    userId: user._id,
                    imageUrl: imageUrl
                }).then(() => {
                    
                })
            } catch(err) {

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
                    <button onClick={handleUpload}>Upload</button>
                    <button onClick={() => setPreviewOpened(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
