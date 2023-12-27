import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { getStorage, ref, deleteObject } from "firebase/storage";

import { loadicon } from "../../assets/loadicon";
import AvatarsBox from "../../components/AvatarsBox";

const EditProfileForm = ({ currentUser, setSwitch }) => {

  
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [pic, setPic] = useState(currentUser?.result?.pic);
  const [tags, setTags] = useState([currentUser?.result?.tags]);
  const [load, setLoad] = useState(false);
  const [dp, setDp] = useState("");
  
  
  const dispatch = useDispatch();
 
  // console.log(tags);

  const handleupload = async(e)=>{
    setLoad(true);
    const selectedFile = e.target.files[0];
    if(selectedFile){
      const storageRef =  firebase.storage().ref()
      const fileRef = storageRef.child(selectedFile.name)
      await fileRef.put(selectedFile)
      .then((snapshot)=>{
        snapshot.ref.getDownloadURL()
        .then((downloadURL)=>{
          console.log(downloadURL);
          setPic(downloadURL );
          setLoad(false);
          
        })
      })
    }else{
      console.log("Please select image to upload")
      setLoad(false);
    }
 }

  // delete image from firebase

  const handleDeleteImage = (imageUrl) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, imageUrl);
      deleteObject(imageRef)
        .then(() => {
          console.log("deleted");
          setPic("");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      setPic("");
      console.log(error.meassage);
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags,pic }));
      const storedData = localStorage.getItem('Profile');
      let updatedData;
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        
        parsedData.result.name = name;
        parsedData.result.about = about;
        parsedData.result.tags = tags;
        parsedData.result.pic = pic;
        updatedData = parsedData;
      }
      localStorage.setItem('Profile', JSON.stringify(updatedData));
      
    setSwitch(false);
  }
 

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>

        <>
              <p style={{ cursor: "pointer" }} onClick={() => setDp("pic")}>
                Add Profile Image
              </p>

              <p style={{ cursor: "pointer" }} onClick={() => setDp("avatar")}>
                Choose Avatar
              </p>

              {dp === "pic" && (
                <label htmlFor="profile">
                  <div className="profile-div">
                    <div className="pd">
                      <h4>Add Profile Picture</h4>
                      <svg
                        className="pic-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        height="34"
                        viewBox="0 -960 960 960"
                        width="34"
                      >
                        <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    className="avatar-pic"
                    type="file"
                    name="pic"
                    id="profile"
                    onChange={handleupload}
                  />
                </label>
              )}

              {dp === "avatar" && <AvatarsBox setAvatar={setPic} />}

              {pic && (
                <div className="picDiv">
                  <button
                    type="button"
                    className="x-mark"
                    onClick={
                      //  dp !== 'avatar' ?
                      () => handleDeleteImage(pic)
                      //  : setPic('')
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 -960 960 960"
                      width="18"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                  <img
                    className="uploadimg"
                    src={pic}
                    alt="upload-image"
                    width="40px"
                  />
                </div>
              )}
            </>

        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        {load===true?
            <img src={loadicon} alt="loading" width='50px' />:
        <input type="submit" value="Save profile" className="user-submit-btn" />
        }
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
