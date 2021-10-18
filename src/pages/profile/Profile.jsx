import "./profile.css";
import { Edit } from "@material-ui/icons";

import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";
import $ from "jquery";

import Feed from "../../components/feed/Feed";
import Modal from "../../components/imagePreviewModal/Modal";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";


export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [file, setFile] = useState(null);
    const username = useParams().username;
    const [previewOpened, setPreviewOpened] = useState(false);
    const [imgType, setImgType] = useState("");

    const handlePreviewOpen = () => setPreviewOpened(true);

    
    const handleChangeCover = () => {
        $("#coverImg").trigger('click');
        $("#coverImg").on('change', e => {
            setFile(e.target.files[0]);
            setImgType("cover");
            handlePreviewOpen();
        });
    }
    
    const handleChangeProfilImg = () => {
        $("#profileImg").trigger('click');
        $("#profileImg").on('change', e => {
            setFile(e.target.files[0]);
            setImgType("profile");
            handlePreviewOpen();
        });
    }

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);

    return (
        <>
            <Modal 
                visibility={previewOpened}
                setPreviewOpened={setPreviewOpened}
                imageFile={file}
                imgType={imgType}
            />
            <Topbar />
            <div className="profile">
                <div className="profileWrapper">
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img 
                                    src={user.coverPicture || PF + "backgroundPlaceholder.jpg"} 
                                    alt="" 
                                    className="profileCoverImg"
                                />
                                <img 
                                    src={user.profilePicture || PF + "profilePlaceholder.png"}
                                    alt="" 
                                    className="profileUserImg"
                                />
                                <div className="editCoverBtn" onClick={handleChangeCover}>
                                    <input type="file" accept="image/jpg, image/png, image/jpeg" id="coverImg" style={{display: "none"}} />
                                    <Edit className="editIcon"/>
                                </div>
                                <div className="editImgBtn" onClick={handleChangeProfilImg}>
                                    <input type="file" accept="image/jpg, image/png, image/jpeg" id="profileImg" style={{display: "none"}} />
                                    <Edit className="editIcon"/>
                                </div>
                            </div>
                            <div className="profileInfo">
                                <h3 className="profileInfoName">{user.displayName}</h3>
                                {/* <h4 className="profileInfoDesc">{user.desc}</h4> */}
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed username={username}/>
                            <Rightbar user={user}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
