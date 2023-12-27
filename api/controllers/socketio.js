import User from "../models/auth.js";
import Notification from "../models/notifications.js";

let usersio = [];

export const socketiofunc = (io) => {
  io.on('connection', (socket) => {
    socket.on('setUserId', async (userId) => {
      if (userId) {
        const oneUser = await User.findById(userId).lean().exec();
        if (oneUser) {
          usersio[userId] = socket;
          console.log(`⚡ Socket: User with id ${userId} connected`);
        } else {
          console.log(`🚩 Socket: No user with id ${userId}`);
        }
      }
    });

    socket.on('getNotificationsLength', async (userId) => {
      const notifications = await Notification
        .find({ user: userId, read: false })
        .lean();
      usersio[userId]?.emit('notificationsLength', notifications.length || 0);
    });

    // Listen for a new post event
    socket.on('newPost', async (postData) => {
      try {
        // Create a new notification
        const newNotification = await Notification.create({
          user: postData.userId,
          userPosted: postData.userPosted,
          title: `Posted by: ${postData.userPosted},`,
          text: `${postData.postBody.substring(0, 100)}...`,
        });

        // Broadcast the new notification to all connected clients
        io.emit('newNotification', newNotification);

      } catch (error) {
        console.error('Error creating notification:', error);
      }
    });

    socket.on('disconnect', () => {
      // Handle disconnect logic
      console.log('🔥 User disconnected from socket');
    });
  });
};