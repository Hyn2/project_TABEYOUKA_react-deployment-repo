import { Avatar } from "@mui/material";

interface profileImageProps {
  src : string
  alt : string
}

const ProfileImage = ({alt, src} : profileImageProps) => {
  return (
      <Avatar alt={alt} src={src} sx={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover",}}/>
  )
};

export default ProfileImage;