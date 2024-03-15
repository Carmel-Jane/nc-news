import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { fetchAllUsers } from "../../utils/api";
import UserCard from "./UserCard";

export default function Users({signedOutUser}) {
  const [usersList, setUsersList] = useState([]);
  const { currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllUsers().then((users) => {
      setUsersList(users);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <ul className="user-list">
        {usersList.map((user)=> {<li>
            <p>{user.username}</p></li>
            
        })}
      </ul>
    </>
  );
}
// currentUser= {currentUser} key={user.username} user={user}