import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';
import PostRoutes from './routes/Posts.js';
import CommentRoutes from './routes/Comments.js';
import connectDB from './connectMongoDb.js';
// import Pusher from 'pusher'
// import Notification from "./models/notifications.js";


dotenv.config();
connectDB();
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(
    cors({
      origin:["https://numan-stackoverflow.vercel.app", "*" ],
      credentials: true,
    })
);

//socket io for notification
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { socketiofunc } from './controllers/socketio.js';

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   // transports: ['websocket', 'polling'],
//   cors: {
//     origin: ["http://localhost:3000","https://numan-stackoverflow.vercel.app/"],
//     credentials: true,
//     methods: ["GET", "POST"]
//   } 
// });
// socketiofunc(io);

// const pusher = new Pusher({
//   appId: process.env.app_id,
//   key: process.env.key,
//   secret: process.env.secret,
//   cluster: process.env.cluster,
//   useTLS: true,
// });

// app.post('/posts/notification', async(req, res) => {
//   const { userPosted, postBody } = req.body;

//   const newNotification = await Notification.create({
//     user: userPosted,
//     title: `Posted by: ${userPosted},`,
//     text: `${postBody.substring(0, 100)}...`,
//   });

//   // Trigger a 'new-post' event for all connected clients
//   pusher.trigger('posts', 'new-post',  newNotification);

//   res.status(200).json({ message: 'Post added successfully' });
// });



app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/posts", PostRoutes);  
app.use("/comment", CommentRoutes);


app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API, <h1> go to <i> /questions/get </i> to get all questions </h1>")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// httpServer.listen(PORT, () => {
//   console.log(`✅ Application running on port: ${PORT}`);
// })
