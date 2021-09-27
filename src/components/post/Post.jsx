import { MoreVert, ThumbUp, ThumbUpOutlined } from "@material-ui/icons"
import "./post.css"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { format } from 'timeago.js'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])
    
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {userId: currentUser._id})
        } catch (err) {

        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img 
                                className="postProfileImg" 
                                src={user.profilePicture || PF + "profilePlaceholder.png"} alt=""
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.img} alt="" className="postImg"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        { isLiked 
                            ? <ThumbUp className="likeIcon" onClick={likeHandler} /> 
                            : <ThumbUpOutlined className="likeIcon" onClick={likeHandler} />
                        }
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    {/* <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
