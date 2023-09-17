import { Box, Button, Typography } from "@mui/material"
import React from "react";



interface page {
    key : string
    onClick : ()=> void
}

interface props {
    pages : page[]
    onClick: (value: string) => void;
}
const GNB = ({pages, onClick} : props) => {
    const [mode, setMode] = React.useState<string>(pages[0].key);
    
    // onClick시 props로 받은 onClick 함수를 실행하고, mode 상태를 업데이트
    const handleClick = (page: string) => {
        onClick(page);
        setMode(page);
    };


    return (
        <>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Box key={page.key} sx={{borderBottom :  `${mode === page.key && "2px red solid"}`}}>
                <Button
                {...page}
                  sx={{ my: 2, display: 'block', color : `${mode !== page.key ? "grey" : "black"}`, mx : 1}}
                  onClick={()=> handleClick(page.key)}
                >
                  <Typography variant='caption'>
                    {page.key}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Box>
        </>
    )
}

export default GNB