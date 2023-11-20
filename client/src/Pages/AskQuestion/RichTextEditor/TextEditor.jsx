import React, { useState, useRef } from 'react';
import '../AskQuestion.css'
import addimg from '../../../assets/addimg.png'
import addvid from '../../../assets/addvid.png'

//firebase imports
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { getStorage, ref, deleteObject } from "firebase/storage";

const TextEditor = ({ setQuestionBody, 
                      questionImg, 
                      setQuestionImg ,
                      questionVid, 
                      setQuestionVid 
}) => {
  const loadicon = 'https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif'
  const [content, setContent] = useState('');
  const editorRef = useRef();
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [save, setSave] = useState(true);
  const [picDiv, setPicDiv] = useState(false);
  const [vidDiv, setVidDiv] = useState(false);
  const [load, setLoad] = useState(false);


    // ------------ firebase image upload and delete ----------------
  
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
            setQuestionImg(downloadURL );
            setLoad(false);
            
          })
        })
      }else{
        console.log("Please select image to upload")
        setLoad(false);
      }
   }
//------------- video upload -----------------
   const handleVideoUpload = async(e)=>{
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
          setQuestionVid(downloadURL );
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
     setQuestionImg("");
    }).catch((error) => {
      console.log(error)
    });
  };

  //------------delete video -----------
  const handleDeleteVideo = (videoUrl) => {
    const storage = getStorage();
    const videoRef = ref(storage, videoUrl);
  
    deleteObject(videoRef).then(() => {
     console.log("deleted")
     setQuestionVid("");
    }).catch((error) => {
      console.log(error)
    });
  };
  // ---------------------------------------------------------
  


  const handleFormatClick = (format) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Check if the selection already has the specified format
    const isFormatApplied = document.queryCommandState(format);

    if (!isFormatApplied) {
      // Apply the specified format
      document.execCommand(format, false, null);

      // Update the state based on the format
      switch (format) {
        case 'bold':
          setBold(true);
          break;
        case 'italic':
          setItalic(true);
          break;
        case 'underline':
          setUnderline(true);
          break;
        default:
          break;
      }
    } else {
      // Remove the specified format
      document.execCommand(format, false, null);

      // Update the state based on the format
      switch (format) {
        case 'bold':
          setBold(false);
          break;
        case 'italic':
          setItalic(false);
          break;
        case 'underline':
          setUnderline(false);
          break;
        default:
          break;
      }
    }
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    setQuestionBody(newContent);
  };

  // link handler
  const handleLinkClick = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    setQuestionBody(newContent);
  };

  // list handler
  const handleListClick = (listType) => {
    document.execCommand(listType, false, null);
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    setQuestionBody(newContent);
  };

  //alignment handler
  const handleTextAlignClick = (alignment) => {
    document.execCommand('justify' + alignment, false, null);
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    setQuestionBody(newContent);
  };


  const handleChange = () => {
    setSave(true)
  };
  
  
  const savedata = ()=>{
    
    if(save){
      
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      setQuestionBody(newContent);
      setSave(false)
    }
  }

  return (
    <div>

      <div className="format-btns">
      {/* Bold button  */}
      <button
        type='button'
        style={{ cursor: 'pointer' }}
        onClick={() => handleFormatClick('bold')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"/></svg>

      </button>

    {/* Italics button  */}
      <button
        type='button'
        style={{  cursor: 'pointer' }}
        onClick={() => handleFormatClick('italic')}
      >  
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"/></svg>

      </button>

    {/* underline button */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleFormatClick('underline')}
        >       
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120v-80h560v80H200Zm280-160q-101 0-157-63t-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63Z"/></svg>

      </button>

      {/* link button  */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleLinkClick()}
        >       
      
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>

      </button>

    {/* un ordered list  */}

      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleListClick('insertUnorderedList')}
        >       
       
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>

      </button>

      {/* ordered list  */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleListClick('insertOrderedList')}
        >       
       
       <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z"/></svg>

      </button>

      {/* align left */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleTextAlignClick('Left')}
        >             
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z"/></svg>

      </button>

      {/* align center */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleTextAlignClick('center')}
        >             
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z"/></svg>
      </button>

      {/* align Right */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={() => handleTextAlignClick('right')}
        >             
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z"/></svg>
      </button>

      {/* camera button to add photo */}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={
          () =>{
            setPicDiv(!picDiv)
            setVidDiv(false)
          }
        }
        >             
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z"/></svg>
      </button>

      {/*  video button*/}
      <button
        type='button'
        style={{cursor: 'pointer' }}
        onClick={
          () =>{
            setPicDiv(false)
            setVidDiv(!vidDiv)
          }
        }
        >             
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-320h80v-120h120v-80H440v-120h-80v120H240v80h120v120ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z"/></svg>
      </button>

    </div>

   { picDiv &&
    <div className="img">
       <label htmlFor="profile">
              <div className="profile-div">

              <div className="pd">
              <img src={addimg} width='40px'  alt="" />
              <h4>Add Image</h4>
              </div>
              <br />
              {
                load &&
                  <img src={loadicon} alt="" width="30px" />
              }
            </div>
            <input
              className="avatar-pic"
              type="file"
              name="pic"  
              id="profile"
              onChange={handleupload}
            />
          </label>
    </div>
    }

   { vidDiv &&
    <div className="img">
       <label htmlFor="profile">
          <div className="profile-div">
            <div className="pd">
              <img src={addvid} width='40px'  alt="" />
              <h4>Add Video</h4>
            </div>
            <br/>
          {load &&
              <img src={loadicon} alt="" width="30px" />
          }
        </div>

        <input
          className="avatar-pic"
          type="file"
          name="pic"  
          id="profile"
          onChange={handleVideoUpload}
        />
        </label>
    </div>
  }

      {/* editor */}
      <div
        id="ask-ques-body"
        style={{ border: '1px solid #ccc', minHeight: '100px', padding: '10px' }}
        ref={editorRef}
        contentEditable={true}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: content }}
        >
      </div>
      {questionImg &&
      <>
        <img className='pic-img' src={questionImg} width="40px"  alt="" />
        <button className='dlt-btn'type='button' onClick={()=>handleDeleteImage(questionImg)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
        <br />
      </>
      }

      {questionVid &&
      <>
        <video className='pic-img' src={questionVid} width="40px"  alt="" />
        <button className='dlt-btn'type='button' onClick={()=>handleDeleteVideo(questionVid)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
        <br />
      </>
      }

      <button type='button' onClick={savedata} style={{marginTop:"20px"}}>
      {save===false?"Saved ✔":"Save "}
        
      </button>
    </div>
  );
};

export default TextEditor;
