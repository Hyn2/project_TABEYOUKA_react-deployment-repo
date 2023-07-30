import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

export default function MyPage() {
    const Navigate = useNavigate();
    const navMypage = () => {
      const id = window.localStorage.getItem('id');
      Navigate(`/profile?user_id=${id}`);
    }

    return (
        
          <Button onClick={navMypage}>
            <AccountCircleIcon/>
          </Button>
        
    )
}