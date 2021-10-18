import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div>
            <Link to={"/profile/" + user.username} style={{textDecoration: "none"}}>
                <li className="sidebarFriend">
                    <img src={user.profilePicture ? user.profilePicture : PF + "profilePlaceholder.png"} alt="" className="sidebarFriendImg"/>
                    <span className="sidebarFriendName">{user.displayName}</span>
                </li>
            </Link>
        </div>
    )
}
