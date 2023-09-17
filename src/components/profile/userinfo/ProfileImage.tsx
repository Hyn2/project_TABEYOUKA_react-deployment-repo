import { Avatar } from "@mui/material";

interface profileImageProps {
  src : string
  alt : string
}

const ProfileImage = ({alt, src} : profileImageProps) => {
  return (
    <Avatar alt={alt} src={src} sx={{ width: "100%", height: "100%", border: "0.8px solid black" }} />
  )
};

export default ProfileImage;