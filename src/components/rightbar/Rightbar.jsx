import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online"
import axios from "axios"
import { Link } from "react-router-dom" 
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@material-ui/icons"

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const {user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    },[currentUser, user]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        }
        getFriends();
    }, [user])

    const handleFollowClick = async (e) => {
        try {
            if(followed) {
                await axios.put("/users/" + user._id + "/unfollow", {userId: currentUser._id});
                dispatch({type: "UNFOLLOW", payload: user._id})
            } else {
                await axios.put("/users/" + user._id + "/follow", {userId: currentUser._id});
                dispatch({type: "FOLLOW", payload: user._id})
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    }

    const HomeRightbar = () => {
        return (
            <>
                {/* <div className="birthdayContainer">
                    <img src="/assets/birthdayIcon.jpg" className="birthdayImg" alt=""/>
                    <span className="birthdayText">
                        <b>Nikhil Shukla</b> and <b>5 other friends</b> have a birthday today
                    </span>
                </div> */}
                {/* <img src={`${PF}avatar3.jpg`} alt="" className="rightbarAd"/> */}
                <div className="rightbarFriends">
                    <h4 className="rightbarTitle">Active now</h4>
                    <ul className="rightbarFriendList">
                        {Users.map(user => (
                            <Online key={user.id} user={user} />
                        ))}
                    </ul>
                </div>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleFollowClick}>
                    {followed ? "Unfriend": "Friend"}
                    {followed ? <Remove /> : <Add />}
                </button>
            )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    {/* <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 
                            ? "Single" 
                            : user.relationship === 2
                            ? "Married"
                            : "-"}
                        </span>
                    </div> */}
                </div>
                <h4 className="rightbarTitle">{user.username}'s friends</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend => (
                        <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>

                            <div className="rightbarFollowing">
                                <img 
                                    src={friend.profilePicture ? friend.profilePicture : PF + "profilePlaceholder.png"} 
                                    alt="" 
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
