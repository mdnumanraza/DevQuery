import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import icon from "../../assets/icon.png";
import { FaBell } from 'react-icons/fa';
import Modal from 'react-modal';
import { apiurl } from "../../api";
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


const Notifications = (
  { navigate,
    notifications, 
    setNotifications,
    notificationCount, 
    setNotificationCount,
    // fetchNotifications
  }) => {

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


      // notifications -------------------------
  const [permission, setPermission] = useState(null);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
    });
  };

  useEffect(()=>{
    requestPermission();
    // fetchNotifications()
  },[])

  const showNotification = (nBody) => {
    if (permission !== "granted") {
      requestPermission();
    } else if (permission === "granted") {
      const notification = new Notification('Hey, check out the new post!', {
        body: `${nBody}`,
        icon: icon,
      });

      notification.onclick = () => {
        navigate('/Posts');
      };
    }
  };

  const deletenotifs = async () => {
    try {
      const response = await fetch(apiurl + '/posts/notification', {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log('Notifications cleared');
        setNotificationCount(0);
      } else {
        console.log('Error clearing notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error in deletenotifs:', error);
    }
  };
  

  

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io(apiurl);

    // Set up event listener for 'newNotification'
    socket.on('newNotification', (newNotification) => {
      setNotifications((prevNotifications) => [newNotification, ...new Set(prevNotifications)]);
      console.log(newNotification);
      showNotification(newNotification.text);
      toast.success('new post by '+ newNotification.userPosted)
      setNotificationCount(notifications.length())
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // -----------------------------------


  return (
    <div style={{marginTop:'35px'}}>
         <button className="btn-clear" onClick={openModal}>  
            <FaBell size={30} />

    {notificationCount>0 && (
        <div
          style={{
            position:'relative',
            top:'-45px',
            right:'-14px',
            backgroundColor: 'red',
            borderRadius:' 50%',
            padding: '2px',
            color:' white',
            fontSize:' 12px',
            width: '14px',
            height: '14px',
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
        <button onClick={deletenotifs} style={{marginTop:'35px'}}>Delete all</button>

        </div>
        <h2>{notifications.length>0 ?'Notifications':'no notifications'}</h2>
      <ul className="notification-list">
        {notifications?.map((notification) => (
           <li key={notification._id} className="notification-item">
           <span className="notification-title">{notification.title}</span> 
           <br />
           <span className="notification-text">{notification.text}</span>
         </li>
        ))}
      </ul>
        
      </Modal>

    </div>
  )
}

export default Notifications
