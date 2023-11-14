import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const loadicon = 'https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif'
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [pic, setPic] = useState(currentUser?.result?.pic);
  const [tags, setTags] = useState([]);
  const [load, setLoad] = useState(false);
  
  
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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags[0] === "" || tags.length === 0) {
      alert("Update tags field");
    } else {
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags,pic }));
    }
    setSwitch(false);
  };

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

        <label htmlFor="profile">
            Add Pofile Image: <br />
            {pic && <img className='uploadimg' src={pic} alt="upload image" width='40px' />}
            <input
              type="file"
              name="pic"  
              id="profile"
              onChange={handleupload}
            />
          </label>

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
