import { Button, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props{
    title : string
    Icon : OverridableComponent<SvgIconTypeMap<any,"svg">> &{muiName : string}
    iconColor : string
    handleOpen : () => void
}

const ModalButton = ({title,Icon,iconColor,handleOpen} : Props) => {
    return (
        <Button onClick={handleOpen} sx={{ color : "black", flexGrow : 1, py : 1.5, m : 0.5, border : "1px solid #787A91", justifyContent: "flex-start"}}>
          <Icon sx={{ color : iconColor }} />
          <Typography variant='caption' sx={{ fontSize : "16px", mx : 1, color : "#787A91" }}>
            {title}
          </Typography>
        </Button>
    )
}

export default ModalButton