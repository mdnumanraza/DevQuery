import notifications from "../models/notifications.js";

// const getAllNotifications = async (req, res) => {
// try {
//       const Notif = await notifications.find()
//       const total = await Notif.countDocuments();
      
//       if (!Notif) {
//           return res.status(400).json({ message: 'No notifications found ⚠' });
//         }
//         console.log('total: ', total,Notif);
//         return res.status(200).json(Notif);
    
//     //   res.status(200).json({ total, Notifications });

// } catch (error) {
//     res.status(404).json(error)
//     }
// };

const getAllNotifications = async (req, res) => {
    try {
      const notifList = await notifications.find().sort({ timestamps: -1 });
      res.status(200).json(notifList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  const deleteNotification = async (req, res) => {
    try {
      const notificationsToDelete = await notifications.find();
      if (!notificationsToDelete || notificationsToDelete.length === 0) {
        return res.status(400).json({ message: `No notifications to delete` });
      }
  
      const result = await notifications.deleteMany();
      if (!result || result.deletedCount === 0) {
        return res.status(400).json({ message: `Can't delete the notifications` });
      }
  
      res.json({ message: `Notifications deleted with success` });
    } catch (error) {
      console.error('Error deleting notifications:', error);
      res.status(500).json({ message: `Internal server error` });
    }
  };
  


const markAllNotificationsAsRead = async (req, res) => {
  const notificationsUpdateMany = await notifications.updateMany(
    { $set: { read: true } }
  );
  if (!notificationsUpdateMany) {
    return res
      .status(400)
      .json({ message: 'Error Marking all notifications as read' });
  }
  res.json({ message: `All notifications for user marked as read` });
};

export {
  getAllNotifications,
  deleteNotification,
  markAllNotificationsAsRead,
};