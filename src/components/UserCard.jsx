import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function UserCard(user){

  return (<li> {user.username}
    {/* // <li className="user-card">
    //   <div className="user-img-box">
    //     <img className="user-img" src={user.avatar_url} alt="user avatar" />
    //   </div>
    //   <h2>{user.username}</h2>
    //   {user.username !== signedInUser.username ? (
    //     <button onClick={handleSignIn}>
    //       Sign in
    //     </button>
    //   ) : <button onClick={handleSignOut} className="red-button">
    //   Sign out
    // </button>} */}
    </li>
  );
}