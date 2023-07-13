import { Box, IconButton } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";


interface Props {
    src : string
}

const Logo = ({src} : Props) => {
    const goToMain = () => {
        Navigate('/');
    }
    const Navigate = useNavigate();
    
    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down('md'));
    
    return ( 
        <Box sx={{ flexGrow: isDownMD ? 1 : 0, mr : 8 }}>
            <IconButton onClick={goToMain}>
                <img width={"141px"} height={"40px"} src={src} alt="gurunavi" />
            </IconButton>
        </Box>
    )
}

export default Logo