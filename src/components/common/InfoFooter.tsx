import { Box, Grid, Typography } from "@mui/material"



export default function InfoFooter() {
    return (
        <Grid container component="footer" sx={{
            backgroundColor: '#F5F5F5',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: "176px",
            display : "flex",
            justifyContent : "center",
            p : 2
        }}>
            <Box sx={{ width : "50%", height : "30%", p : 1, display : "flex" }}>
                <Box sx={{ width : "50%", height : "100%", display : "flex"}}>
                    <Box sx={{ width : "10%", height : "100%" }}>
                        <img src="public/tabeyoukaMiniLogo.png" alt="" style={{
                            width : "100%",
                            height : "100%"
                        }}/>
                    </Box>
                    <Box sx={{
                        width : "90%",
                        height : "100%",
                        display : "flex",
                        alignItems: "center" }}>
                        <Typography sx={{
                            fontSize : "13px",
                            ml : 2
                        }}>食べようかは皆様のおかげで運営されております。</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width : "50%",
                    height : "100%",
                    display : "flex",
                    alignItems: "center",
                    justifyContent : "flex-end"
                }}>
                    <Typography sx={{
                        fontSize : "13px",
                        ml : 2
                    }}>@project Tabeyouka</Typography>
                </Box>
            </Box>
        </Grid>
    )
}
