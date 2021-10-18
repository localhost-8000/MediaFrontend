import "./online.css";

export default function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={user.profilePicture ? user.profilePicture : PF + "profilePlaceholder.png"} alt="" className="rightbarProfileImg"/>
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{user.displayName}</span>
            </li>
        </div>
    )
}
