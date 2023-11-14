import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
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
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
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
