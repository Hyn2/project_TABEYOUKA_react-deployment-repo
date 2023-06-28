import { Button, Typography } from "@mui/material"


const SearchBtn = () => {

    return (
        <Button sx={{ color : "black", mx : 1, flexGrow : 1, py : 1.2, justifyContent: "center"} }>
            <Typography variant='caption' sx={{ fontSize : "18px" }}>
            검색
            </Typography>
        </Button>
    )
}

export default SearchBtn