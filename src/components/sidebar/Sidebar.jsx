import "./sidebar.css";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CloseFriend from "../closeFriend/CloseFriend";
import { AuthContext } from "../../context/AuthContext";
import generateToken from "../../firebase_app/token_generator";

export default function Sidebar() {

    const [allUsers, setAllUsers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllUsers = async () => {
            
            generateToken().then(async token => {
                // console.log("token rec: ", token);
                const res = await axios.post("/users/all-users", { username: user.username }, {
                    headers: {
                        "Authorization": token
                    }
                });
                setAllUsers(res.data);
                // console.log('response', res.data[0]);
                // console.log('all userdata: ', allUsers);
            });
        }
        fetchAllUsers();
    }, [user._id]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {/* <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show more</button>
                <hr className="sidebarHr"/> */}
                <h4>Do you know</h4>
                {/* <p>Coming soon</p> */}
                <ul className="sidebarFriendList">
                    {allUsers.map(user => (
                        <CloseFriend key={user._id} user={user} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
