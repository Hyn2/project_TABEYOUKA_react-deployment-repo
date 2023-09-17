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
          color : "black",
          flexGrow : 1,
          p: isDownMD ? 1 : 2,
          border : "1px solid #787A91",
          justifyContent: "flex-start",
          my : 0.5,
          boxShadow : "0px 0px 5px 0px rgba(0,0,0,0.2)",
        }}>
          <Icon sx={{ color : iconColor }} />
          <Typography variant='caption' sx={{ fontSize : isDownMD ? "14px" : "16px", mx: isDownMD ? 0 : 1, color : "#787A91", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", }}>
            {title}
          </Typography>
        </Button>
    )
}

export default ModalButton