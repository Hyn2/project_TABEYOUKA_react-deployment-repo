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
  const [userData, setUserData] = useState({ nickname: " ", profile_image: " ", bio: " " });
  const [name, setName] = useState(userData.nickname);
  const [bio, setBio] = useState(userData.bio);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [textFilled, setTextFilled] = useState(true);

  // 현재 유저의 정보
  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/user`, {
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
  }, [props.open]);

  useEffect(() => {
    setTextFilled(name.trim() !== '');
  }, [name]);

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
    formData.append('id', props.userId);
    formData.append('nickname', name);
    formData.append('bio', bio);
    if(selectedFile) {
      formData.append('profile_image', selectedFile);
    }
    formData.append('_method', 'patch');
    console.log(formData);

    axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization : window.localStorage.getItem('access_token')

      },
    })
      .then(() => {
        // 요청 성공 시 작업
        alert('編集を完了しました.');
        props.onClose();
      })
      .catch(error => {
        // 요청 실패 시 작업
        console.error(error);
      });
  }
  
  return (
    
    <Modal open={props.open} onClose={props.onClose}  sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "500px", mx : "30px", padding: "30px", bgcolor: "white",display: "flex", flexDirection: 'column', borderRadius: "1%"}}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography sx={{my: "10px"}} id="modal-modal-title" variant="h6" component="h2">
            プロフィール編集
            </Typography>
            <Avatar sx={{my: "10px", width: "100px", height: "100px", border:  "0.5px solid black"}} src={previewUrl} />
            <TextField
              required
              id="filled-helperText"
              label="Nickname"
              helperText="ニックネームを入力してください."
              variant="standard"
              onChange={nameHandleChange}
              margin="normal"
              error={name == '' ? true : false}
              value={name}
              />
            <TextField
              id="filled-helperText"
              label="Description"
              helperText="紹介を入力してください."
              variant="standard"
              onChange={bioHandleChange}
              margin="normal"
              value={bio}
              />
            <input type="file" onChange={handleFileChange} />
          </Box>
          <Box sx={{textAlign: "right"}}>
            <Button disabled={!textFilled} onClick={patchSubmit} sx={{width: "50px", float: "right"}}>編集</Button>
            <Button onClick={props.onClose} sx={{width: "80px", float: "right"}}>キャンセル</Button>
          </Box>
        </Box>
    </Modal>
      
  )
}

export default EditModal;


