import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";

//firebase imports
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { getStorage, ref, deleteObject } from "firebase/storage";

const Auth = () => {
  const loadicon = 'https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif'
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };


  // ------------ firebase image upload and delete ----------------

  const [pic, setPic]= useState('');
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
  const storage = getStorage();
  const imageRef = ref(storage, imageUrl);

  deleteObject(imageRef).then(() => {
   console.log("deleted")
    setPic("");
  }).catch((error) => {
    console.log(error)
  });
};
// ---------------------------------------------------------


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password,pic }, navigate,setError));
    } else {
      dispatch(login({ email, password }, navigate,setError));
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {/* {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )} */}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          {
            isSignup &&
            <>
            <label htmlFor="profile">
              <div className="profile-div">

              <div className="pd">
              <h4>Profile Picture</h4>
      
              <svg className="pic-svg" xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 -960 960 960" width="34"><path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/></svg>
           
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


      {pic && 
        <div className="picDiv">
          <button type="button" className="x-mark" onClick={()=>handleDeleteImage(pic)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
          <img  className='uploadimg' src={pic} alt="upload image" width='40px'/>
        </div>
        }

      </>
    }      


         {load===true?
            <img src={loadicon} alt="loading" width='50px' />:
         <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>}
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
          {
            error &&
            <p style={{padding:"15px",color:"red",background:"gray",fontWeight:"500"}}>  {error}</p>
          }
    </section>
  );
};

export default Auth;
