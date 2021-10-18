import "./share.css";
import { PermMedia, Cancel } from '@material-ui/icons';

import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import uploadImage from "../../firebase_app/firebaseUpload";


export default function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    const desc = useRef();
    const [file, setFile] = useState(null);
    
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        uploadImage(file, user._id, async (imageUrl) => {

            const newPost = {
                userId: user._id,
                desc: desc.current.value,
                img: imageUrl
            }
    
            try {
                const res = await axios.post("/posts", newPost)
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        });
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        src={user.profilePicture ? user.profilePicture : PF + "profilePlaceholder.png"} 
                        alt="" 
                        className="shareProfileImg"
                    />
                    <input 
                        type="text" 
                        className="shareInput" 
                        placeholder={"Share your thoughts.." + user.displayName.split(" ")[0]}
                        ref={desc}
                    />
                </div>
                <hr className="shareHr"/>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" alt="" src={URL.createObjectURL(file)} />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" style={{cursor: "pointer"}} className="shareIcon" />
                            <span className="shareOptionText" style={{cursor: "pointer"}}>Images or Videos</span>
                            <input 
                                type="file" 
                                style={{display: "none"}}
                                id="file" 
                                accept=".png,.jpeg,.jpg" 
                                onChange={fileHandler}
                            />
                        </label>
                        {/* <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div> */}
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
