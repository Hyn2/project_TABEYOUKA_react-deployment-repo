import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface UserListItemProps {
  nickname: string,
  profile_image: string,
}


const UserListItem = ({nickname, profile_image} : UserListItemProps) => {

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Avatar src={profile_image} sx={{m: "10px"}}></Avatar>
        <ListItemText primary={nickname} />
      </ListItemButton>
    </ListItem>
  );

}

export default UserListItem;