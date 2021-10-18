import "./rightbar.css";
import { Add, Remove } from "@material-ui/icons";

import Online from "../online/Online";

import axios from "axios";
import { Link } from "react-router-dom" ;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    },[currentUser, user]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user.username);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        }
        if(user) {
            getFriends();
        }
    }, [user]);

    useEffect(() => {
        const getAuthUserFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + currentUser.username);
                setFriends(friendList.data);
                // console.log("friendlist: ", friendList.data);
            } catch (err) {
                console.error(err);
            }
        }
        if(!user) {
            getAuthUserFriends();
        }
    }, [currentUser])

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

    // console.log("user friends: ", friends);

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
                        {friends.length === 0 
                            ? "Oops 😯, you have no followers yet!" 
                            :friends.map(friend => (
                                <Online key={friend._id} user={friend} />
                            ))
                        }
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
                    {followed ? "Unfollow": "Follow"}
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
                <h4 className="rightbarTitle">{user.username === currentUser.displayName ? user.displayName : "Your"} followers</h4>
                <div className="rightbarFollowings">
                    {friends.length === 0 
                        ? "Oops 😯, no followers yet" 
                        : friends.map(friend => (
                            <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>

                                <div className="rightbarFollowing">
                                    <img 
                                        src={friend.profilePicture ? friend.profilePicture : PF + "profilePlaceholder.png"} 
                                        alt="" 
                                        className="rightbarFollowingImg"
                                    />
                                    <span className="rightbarFollowingName">{friend.displayName}</span>
                                </div>
                            </Link>
                        ))
                    }
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
