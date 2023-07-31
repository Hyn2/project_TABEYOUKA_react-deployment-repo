import { Avatar, Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface editModalProps {
  userId : string,
  open : boolean,
  onClose: () => void;
}

const EditModal = (props : editModalProps) => {
  // State
  const [userData, setUserData] = useState({ idToken: window.localStorage.getItem('idToken'), nickname: " ", profile_image: " ", bio: " " });
  const [name, setName] = useState(userData.nickname);
  const [bio, setBio] = useState(userData.bio);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  // 현재 유저의 정보
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user`, {
        headers : {
          Authorization : window.localStorage.getItem('access_token')
        },
        params : {
          user_id : props.userId,
        }
      })
      .then(response => {
        setUserData(response.data|| " ");
        setName(response.data.nickname|| " ");
        setBio(response.data.bio|| " ");
        setPreviewUrl(response.data.profile_image|| " ");
      })
      .catch(error => {
        console.error(error);
      });
  }, [open]);


  const nameHandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const bioHandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(undefined);
    }
  };

  // 수정 요청 보내기
  const patchSubmit = () => {
    const formData = new FormData();
    formData.append('id', 'justin010129@gmail.com');
    formData.append('nickname', name);
    formData.append('bio', bio);
    if(selectedFile) {
      console.log(selectedFile);
      formData.append('profile_image', selectedFile);
    }
    formData.append('_method', 'patch');

    for (const [name, value] of formData.entries()) {
      console.log(`${name} : ${value}`)
    }

    axios.post('http://localhost:8000/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization : window.localStorage.getItem('access_token')

      },
    })
      .then(response => {
        // 요청 성공 시 작업
        alert('수정이 완료되었습니다.');
        props.onClose();
      })
      .catch(error => {
        // 요청 실패 시 작업
        console.error(error);
      });
  }
  
  return (
    
    <Modal open={props.open} onClose={props.onClose}  sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "500px", padding: "30px", bgcolor: "white",display: "flex", flexDirection: 'column', borderRadius: "1%"}}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography sx={{my: "10px"}} id="modal-modal-title" variant="h6" component="h2">
              프로필 수정
            </Typography>
            <Avatar sx={{my: "10px", width: "100px", height: "100px"}} src={previewUrl} />
            <TextField
              id="filled-helperText"
              label="Nickname"
              helperText="닉네임을 입력해주세요."
              variant="standard"
              onChange={nameHandleChange}
              margin="normal"
              value={name}
              />
            <TextField
              id="filled-helperText"
              label="Description"
              helperText="한 줄 소개를 입력해주세요."
              variant="standard"
              onChange={bioHandleChange}
              margin="normal"
              value={bio}
              />
            <input type="file" onChange={handleFileChange} />
          </Box>
          <Box sx={{textAlign: "right"}}>
            <Button onClick={patchSubmit} sx={{width: "50px", float: "right"}}>수정</Button>
            <Button onClick={props.onClose} sx={{width: "50px", float: "right"}}>취소</Button>
          </Box>
        </Box>
    </Modal>
      
  )
}

export default EditModal;


