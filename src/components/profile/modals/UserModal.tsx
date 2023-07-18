import axios from "axios";
import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";

interface userModalProps {
  userModalType: string
}

const UserModal = ({userModalType} : userModalProps) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if(userModalType === "following") {
      axios.get('http://localhost:8000/api/following?id=tabeyouka@gmail.com')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      axios.get('http://localhost:8000/api/follower?id=tabeyouka@gmail.com')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);
  
  return (
    <>
      {userData.map((user) => (
        <UserListItem nickname={user['nickname']} profile_image={user['profile_image']}/>
      ))}
    </>
  )

}

export default UserModal;