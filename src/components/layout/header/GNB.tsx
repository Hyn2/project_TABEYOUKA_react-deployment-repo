import { Box, Button, Typography } from "@mui/material"
import React from "react";

const pages = [{key : 'Products', onClick :()=> {console.log("Products")}}, {key : 'Pricing', onClick :()=> {console.log("Pricing")}}, {key : 'Blog', onClick : ()=> {console.log("Blog")}}];

const GNB = () => {
    const [mode, setMode] = React.useState<string>(pages[0].key);

    return (
        <>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },ml : 8 }}>
            {pages.map((page) => (
              <Box key={page.key} sx={{borderBottom :  `${mode === page.key && "2px red solid"}`}}>
                <Button
                {...page}
                  sx={{ my: 2, display: 'block', color : `${mode !== page.key ? "grey" : "black"}`, mx : 1}}
                  onClick={()=> setMode(page.key)}
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