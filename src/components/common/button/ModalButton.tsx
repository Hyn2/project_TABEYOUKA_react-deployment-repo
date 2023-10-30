import { Button, SvgIconTypeMap, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props{
    title : string
    Icon : OverridableComponent<SvgIconTypeMap<any,"svg">> &{muiName : string}
    iconColor : string
    handleOpen : () => void
}

const ModalButton = ({title,Icon,iconColor,handleOpen} : Props) => {
    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Button onClick={handleOpen} sx={{
          width: "100%",
          backgroundColor : "white",
          color : "black",
          p: isDownMD ? 1 : 2,
          justifyContent: "flex-start",
          my : 0.5,
          boxShadow : "2px 2px 5px 0px rgba(0,0,0,0.4)",
          "&:hover" : {
            backgroundColor : "#F5F5F5",
            transition : "all 0.4s ease-in-out",
            boxShadow : "0px 3px 5px 0px rgba(0,0,0,0.6)",
          }
        }}>
          <Icon sx={{ color : iconColor }} />
          <Typography variant='caption' sx={{ fontSize : isDownMD ? "14px" : "16px", mx: isDownMD ? 0 : 1, color : "#787A91", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", }}>
            {title}
          </Typography>
        </Button>
    )
}

export default ModalButton