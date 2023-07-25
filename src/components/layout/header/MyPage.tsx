import { Box, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

export default function MyPage() {
    const Navigate = useNavigate();
    const navMypage = () => {
      Navigate('/mypage');
    }

    return (
        
          <Button onClick={navMypage}>
            <AccountCircleIcon/>
          </Button>
        
    )
}