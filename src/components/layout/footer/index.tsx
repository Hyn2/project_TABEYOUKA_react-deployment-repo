import { Box, Typography} from "@mui/material"

export default function Footer() {
    return (
      <footer>
        <Box sx={footerContainer}>
            <Box 
                component="img"
                src="public/tabeyoukaMiniLogo.png"
                sx={{
                    height: 50,
                    width: 50,
                    maxHeight: { xs: 75, md: 75 },
                    maxWidth: { xs: 75, md: 75 },
                }}  
            >
            </Box>
            <Typography sx={footerTypo} >食べようかは皆様のおかげで運営されております。</Typography>
            <Typography sx={footerTypo} >@project Tabeyouka</Typography>
        </Box>
      </footer>
    )
}

const footerContainer = {
    width : "100%",
    height : "auto",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    bgcolor : "#F5F5F5",
    py : 2
}

const footerTypo = {
    fontSize : "13px",
    ml : 2
}
