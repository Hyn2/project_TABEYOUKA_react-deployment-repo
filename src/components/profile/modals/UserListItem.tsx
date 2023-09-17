import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserListItemProps {
  id: string,
  nickname: string,
  profile_image: string,
}


const UserListItem = ({id, nickname, profile_image} : UserListItemProps) => {
  const navigate = useNavigate();
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={()=> {
              navigate(`/profile?user_id=${id}`);
              location.reload();
            }}>
        <Avatar src={profile_image} sx={{m: "10px"}}></Avatar>
        <ListItemText primary={nickname} />
      </ListItemButton>
    </ListItem>
  );

}

export default UserListItem;