import "./sidebar.css"
import { RssFeed, School, WorkOutline } from "@material-ui/icons"
import { Users } from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"

export default function Sidebar() {
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
                <ul className="sidebarFriendList">
                    {Users.map(user => (
                        <CloseFriend key={user.id} user={user} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
