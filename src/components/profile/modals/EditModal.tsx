import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";


const EditModal = () => {

  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (name === '') {
      setError(true);
    } else {
      setError(false);
      // 유효성 검사 통과한 경우 다음 로직 실행
      // ...
    }
    setName(e.target.value);
  };

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };
  
  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        프로필 수정
      </Typography>
      <TextField
        id="filled-helperText"
        label="Nickname"
        helperText="닉네임을 입력해주세요."
        variant="standard"
        onChange={handleChange}
        error={error}
        margin="normal"
        />
      <TextField
        id="filled-helperText"
        label="Description"
        helperText="한 줄 소개를 입력해주세요."
        variant="standard"
        onChange={handleChange}
        margin="normal"
        />
      <input type="file" onChange={handleFileChange} />
    </Box>
  )
}

export default EditModal;


