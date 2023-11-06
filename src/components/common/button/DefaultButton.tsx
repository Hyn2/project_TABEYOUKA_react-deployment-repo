interface buttonInterface {
  onClick : () => void,
  width : string,
  height : string,
  text : string,
}


export default function Defaultbutton({onClick, width, height, text} : buttonInterface) {
  return (
    <button onClick={onClick} style={{width : width, height : height, border: "none", backgroundColor: '#ffa41b', borderRadius: "10%" }}>
    {text}
    </button> 
  )
}
