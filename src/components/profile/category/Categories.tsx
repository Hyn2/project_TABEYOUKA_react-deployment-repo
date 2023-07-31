import { Stack } from "@mui/material";
import Story from "./Story";
import StoryModal from "../modals/StoryModal";
import { useEffect, useState } from "react";
import axios from "axios";
import AddStoryModal from "../modals/AddStoryModal";

interface categoriesProps {
  id : string,
}

const Categories = ({id} : categoriesProps) => {
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [storyList, setStoryList] = useState([]);
  const [listInfo, setListInfo] = useState({
    'id' : 0,
    'name' : '',
    'image' : '',
  });

  interface openModalProps {
    id :number,
    listName: string,
    image: string,
  }

  const openModal = ({id, listName, image}: openModalProps) => {
    setModal(true);
    setListInfo({
      'id' : id,
      'name' : listName,
      'image' : image,
    });
  }

  const closeModal = () => {
    setModal(false);
  }

  const openAddModal = () => {
    setAddModal(true);
  }

  const closeAddModal = () => {
    setAddModal(false);
  }
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/storylist`,{
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
      params: {
        user_id: id,
      }   
    })
    .then(response => {
      setStoryList(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  },[addModal]);

  return (
    <>
      <Stack direction="row" spacing={4} sx={{mb: "30px"}}>
        <Story id="new" onClick={openAddModal} src="/tabeyoukaMiniLogo.png" alt="createImage" title="レビューリスト作成" />
        {storyList.map((list) => (
        <Story key={list['id']} id={list['id']} onClick={()=>{openModal({
          id : list['id'], 
          listName : list['story_name'], 
          image : list['image']})}} src={list['image']} alt="storyImage" title={list['story_name']}/>
        ))}
      </Stack>
      {modal && (
        <StoryModal
          open={modal}
          onClose={closeModal}
          id={listInfo.id}
          image = {listInfo.image}
          storyName= {listInfo.name}
        />
      )}
      <AddStoryModal userId={id} open={addModal} onClose={closeAddModal} />
    </>

  );
}

export default Categories;