import { Box, Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IProps {
  children: React.ReactNode;
  Icon : OverridableComponent<SvgIconTypeMap<any,"svg">> &{muiName : string}
  iconColor : string;
  word: string;
  modalOpen: () => void;
  width: string;
}


export default function ReSearchModalButton({ children, Icon, iconColor, word, modalOpen, width } : IProps) {
  return (
    <Box sx={{ width: {width}, height: "100%", ml: 1, borderBottom: "0.5px solid black" }}>
      <Button
        sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", color: "#C2C2C2" }}
        onClick={modalOpen}
      >
        <Icon sx={{ color : iconColor }} />
        {word}
      </Button>
      {children}
    </Box>
  );
}