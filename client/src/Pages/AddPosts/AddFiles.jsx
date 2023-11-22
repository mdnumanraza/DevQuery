import React, { useState } from "react";
//firebase imports
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { loadicon } from "../../assets/loadicon";
import addimg from "../../assets/addimg.png";
import addvid from "../../assets/addvid.png";
import addfile from "../../assets/addfile.png";
import fileicon from "../../assets/file.svg";
import deletebtn from "../../assets/delete.svg";

const AddFiles = () => {
  const [load, setLoad] = useState(false);
  const [picDiv, setPicDiv] = useState(false);
  const [vidDiv, setVidDiv] = useState(false);
  const [fileDiv, setFileDiv] = useState(false);
  const [status, setStatus] = useState("");
  const [pic, setPic] = useState("");
  const [vid, setVid] = useState("");
  const [otherFile, setOtherFile] = useState("");

  // ------------ firebase image upload and delete ----------------

  const handleupload = async (e) => {
    setLoad(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setPic(downloadURL);
          setStatus("Image uploaded successfully ");
          setLoad(false);
        });
      });
    } else {
      console.log("Please select image to upload");
      setLoad(false);
    }
  };
  //------------- video upload -----------------
  const handleVideoUpload = async (e) => {
    setLoad(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setVid(downloadURL);
          setStatus("Video uploaded successfully ");
          setLoad(false);
        });
      });
    } else {
      console.log("Please select video to upload");
      setLoad(false);
    }
  };

  //------------- file upload -----------------
  const handleuploadFile = async (e) => {
    setLoad(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setOtherFile(downloadURL);
          setStatus("file uploaded successfully ");
          setLoad(false);
        });
      });
    } else {
      console.log("Please select file to upload");
      setLoad(false);
    }
  };

  // delete image from firebase

  const handleDeleteImage = (imageUrl) => {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);

    deleteObject(imageRef)
      .then(() => {
        console.log("deleted");
        setPic("");
        setStatus("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //------------delete video -----------
  const handleDeleteVideo = (videoUrl) => {
    const storage = getStorage();
    const videoRef = ref(storage, videoUrl);

    deleteObject(videoRef)
      .then(() => {
        console.log("deleted");
        setVid("");
        setStatus("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //------------delete file -----------
  const handleDeletefile = (fileUrl) => {
    const storage = getStorage();
    const fileRef = ref(storage, fileUrl);

    deleteObject(fileRef)
      .then(() => {
        console.log("deleted");
        setOtherFile("");
        setStatus("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ---------------------------------------------------------

  return (
    <div>
      <div className="add-media-btns">
        {/* camera button to add photo */}
        <button
          className="media-btn"
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPicDiv(!picDiv);
            setFileDiv(false);
            setVidDiv(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
          </svg>
        </button>

        {/*  video button*/}
        <button
          className="media-btn"
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPicDiv(false);
            setFileDiv(false);
            setVidDiv(!vidDiv);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M360-320h80v-120h120v-80H440v-120h-80v120H240v80h120v120ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
          </svg>
        </button>

        {/* file button*/}
        <button
          className="media-btn"
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPicDiv(false);
            setFileDiv(!fileDiv);
            setVidDiv(false);
          }}
        >
          <img src={fileicon} alt="file" />
        </button>
      </div>
      <div className="add-media">
        {/* add image  */}
        {picDiv && (
          <div className="img">
            <label htmlFor="profile">
              <div className="profile-div">
                <div className="pd">
                  <img src={addimg} width="40px" alt="" />
                  <h4>Add Image/Gif</h4>
                </div>
                <br />
                {load && <img src={loadicon} alt="" width="30px" />}
              </div>
              <input
                className="avatar-pic"
                type="file"
                name="pic"
                id="profile"
                onChange={handleupload}
              />
            </label>

            <div className="code-btns">
              <button type="button" onClick={() => setPicDiv(false)}>
                Done
              </button>
              <p
                onClick={() => {
                  handleDeleteImage(pic)
                  setPicDiv(false);
                }}
              >
                Cancel
              </p>
            </div>

            {status && <div className="status">{status}</div>}
          </div>
        )}

        {/* add video  */}
        {vidDiv && (
          <div className="img">
            <label htmlFor="profile">
              <div className="profile-div">
                <div className="pd">
                  <img src={addvid} width="40px" alt="" />
                  <h4>Add Video</h4>
                </div>
                <br />
                {load && <img src={loadicon} alt="" width="30px" />}
              </div>
              <input
                className="avatar-pic"
                type="file"
                name="pic"
                id="profile"
                onChange={handleVideoUpload}
              />
            </label>
            <div className="code-btns">
              <button type="button" onClick={() => setVidDiv(false)}>
                Done
              </button>
              <p
                onClick={() => {
                  handleDeleteVideo(vid)
                  setVidDiv(false);
                }}
              >
                Cancel
              </p>
            </div>

            {status && <div className="status">{status}</div>}
          </div>
        )}

        {/* upload file  */}
        {fileDiv && (
          <div className="img">
            <label htmlFor="profile">
              <div className="profile-div">
                <div className="pd">
                  <img
                    src={addfile}
                    width="40px"
                    alt=""
                    style={{ marginTop: "5px" }}
                  />
                  <h4>Add File</h4>
                  <p>.txt , .pdf</p>
                </div>

                {load && <img src={loadicon} alt="" width="30px" />}
              </div>
              <input
                className="avatar-pic"
                type="file"
                name="pic"
                id="profile"
                onChange={handleuploadFile}
              />
            </label>

            <div className="code-btns">
              <button type="button" onClick={() => setFileDiv(false)}>
                Done
              </button>
              <p
                onClick={() => {
                  handleDeletefile(otherFile)
                  setFileDiv(false);
                }}
              >
                Cancel
              </p>
            </div>

            {status && <div className="status">{status}</div>}
          </div>
        )}
      </div>

      <div className="show-media">
        {pic && (
          <>
            <img src={pic} width="50px" alt="" />
            <button
              type="button"
              className="media-btn"
              onClick={() => handleDeleteImage(pic)}
            >
              <img src={deletebtn} alt="" />
            </button>
          </>
        )}

        {vid && (
          <>
            <video src={vid} width="50px" alt="" />
            <button
              type="button"
              className="media-btn"
              onClick={() => handleDeleteVideo(vid)}
            >
              <img src={deletebtn} alt="" />
            </button>
          </>
        )}

        {otherFile && (
          <>
            <embed 
            src={otherFile} 
            width="80px"  
            type="application/pdf"
            frameBorder="0"
            scrolling="auto" 
            />
            <button
              type="button"
              className="media-btn"
              onClick={() => handleDeletefile(otherFile)}
            >
              <img src={deletebtn} alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddFiles;
