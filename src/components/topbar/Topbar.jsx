import "./topbar.css"
import { Search } from "@material-ui/icons";

import {Link} from 'react-router-dom';
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";


export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">CollegeMedia</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input type="text" placeholder="Search here" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                {/* <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div> */}
                {/* <div className="topbarIcons">
                    <div className="topbarIconItems">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItems">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItems">
                        <Notifications />
                        <span className="topbarIconBadge">5</span>
                    </div>
                </div> */}

                <Link to={`/profile/${user.username}`}>
                    <img 
                        src={user.profilePicture ? user.profilePicture : PF + "profilePlaceholder.png"} 
                        alt="profile avatar" 
                        className="topbarImg" 
                    />
                </Link>
            </div>
        </div>
    )
}
