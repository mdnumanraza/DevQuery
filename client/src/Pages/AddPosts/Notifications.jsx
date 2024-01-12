import React, { useState, useEffect } from "react";
import icon from "../../assets/icon.png";
import { FaBell } from 'react-icons/fa';
import Modal from 'react-modal';

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');


const Notifications = ({ navigate}) => {

  //modal----------------------------------
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // fetchNotifications();
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  const [permission, setPermission] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
    });
  };

  useEffect(()=>{
    requestPermission();
  },[])

  const showNotification = (nBody) => {
    if (permission === "denied") {
      console.log("not granted")
      requestPermission();
    } else if (permission === "granted") {
      console.log("notification should show");
      const notification = new Notification('Hey, check out the new post!', {
        body: `${nBody}`,
        icon: icon,
      });

      notification.onclick = () => {
        navigate('/Posts');
      };
    }
  };

  useEffect(() => {
    // Set up Firebase Realtime Database listener
    const notificationsRef = firebase.database().ref('notifications');
    let initialLoad = true;
  
    const handleData = (snapshot) => {
      if (snapshot.val() && !initialLoad ) {
        const data = Object.values(snapshot.val());
        const n = data.length-1;
        const latestNotification = data[n];
        addNotifLocal(latestNotification)
        
          showNotification(latestNotification.postBody);
          toast.dark(`New Update by ` + latestNotification.userPosted + ' \n - ' + latestNotification.postBody+'...');
      
        // console.log('New Post:', data);
      }
      if (initialLoad) {
        initialLoad = false;
      }
    };
  
    notificationsRef.on('value', handleData);
  

    return () => {
      notificationsRef.off('value', handleData);
    };
  }, []);
  

 useEffect(()=>{
  const existingNotifs = JSON.parse(localStorage.getItem('Notifications')) || [];
  setNotificationCount(existingNotifs.length);
  setNotifications(existingNotifs);
 },[])

  const addNotifLocal = (notif)=>{
    const existingNotifs = JSON.parse(localStorage.getItem('Notifications')) || [];
    const newNotif = [...existingNotifs, notif];
    localStorage.setItem('Notifications', JSON.stringify(newNotif));
    setNotifications(newNotif);
    setNotificationCount(newNotif.length)
  }

  const deleteNotifById = (id) => {
    const existingNotifs = JSON.parse(localStorage.getItem('Notifications')) || [];
  
    const indexToDelete = existingNotifs.findIndex((notifs)=>notifs.id === id)
  
    if (indexToDelete !== -1) {
      const updatedNotifs = [
        ...existingNotifs.slice(0, indexToDelete),
        ...existingNotifs.slice(indexToDelete + 1),
      ];
  
      localStorage.setItem('Notifications', JSON.stringify(updatedNotifs));
      setNotifications(updatedNotifs);
      setNotificationCount(updatedNotifs.length);
  
      console.log('Notification deleted successfully');
    } else {
      console.log('Notification not found');
    }
  };

  const deleteAllNotif = ()=>{
    const empty = [];
    localStorage.setItem('Notifications', JSON.stringify(empty));
    setNotificationCount(0);
    setNotifications([]);
  }
  

 

  return (
    <div style={{marginTop:'10px'}}>
      <ToastContainer/>
         <button className="btn-clear" onClick={openModal}>  
            <FaBell size={20} />

    {notificationCount>0 && (
        <div
          style={{
            position:'relative',
            top:'-25px',
            right:'-11px',
            backgroundColor: 'red',
            borderRadius:' 50%',
            padding: '2px',
            color:' white',
            fontSize:' 10px',
            width: '10px',
            height: '10px',
          }}
        >
          {notificationCount}
        </div>
      )}
        </button>

        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <button onClick={closeModal} style={{marginTop:'35px'}}>close</button>
        <button className="btn-clear" onClick={deleteAllNotif} style={{marginTop:'35px'}}>Clear all</button>

        </div>
        <h2>{notifications.length>0 ?'Notifications':'no notifications'}</h2>
      <ul className="notification-list">
        {notifications?.map((notif) => (
           <li key={notif.id} className="notification-item">
            
            <div className="leftn">
              <span className="notification-title">{notif.userPosted}</span> 
              <br />
              <span className="notification-text">{notif.postBody}...</span>
            </div>

            <div className="rightn">
              <button  className="btn-clear" onClick={()=>deleteNotifById(notif.id)}>❌</button>
            </div>
         </li>
        ))}
        
      </ul>
        
      </Modal>

    </div>
  )
}

export default Notifications
