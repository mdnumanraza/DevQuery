# DevQuey

DevQuey is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a platform for developers to ask questions, share knowledge, and it also has social media section to share your knowledge in the community.

## live preview

- [link](https://numan-stackoverflow.vercel.app/)

## Features

- **Question and Answer Forum**: Users can post questions, provide answers, and engage in discussions on various topics related to software development.
- **User Authentication**: Secure user authentication system allows users to register, log in, and manage their profiles.
- **Profanity Filter and Content Moderation**: The platform includes a profanity filter and content moderation system that detects abusive, hateful, or inappropriate language. Users are blocked from posting such content to maintain a positive and respectful community environment.
- **Real-time Notification System**: Users receive real-time notifications for various activities, including new responses to their questions, comments on their posts, and mentions by other users.
- **Community Features**: The platform includes a community section where users can post text, images, videos, and files. This enables users to share knowledge, resources, and updates within the community, fostering collaboration and engagement.

## Technologies Used

- **Frontend**: React.js, Redux (for state management), React Router (for routing)
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Media Storage**: Firebase
- **Real-time Notification**: Firebase
- **User Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS
- **Deployment**: Vercel

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the `client` directory and run `npm install` to install dependencies.
3. Navigate to the `api` directory and run `npm install` to install server dependencies.
4. Create a `.env` file in the `api` directory and add your MongoDB connection string as `MONGODB_URI`.
5. In the `client` directory, run `npm start` to start the React development server.
6. In the `api` directory, run `npm start` to start the Express server.
7. Open your browser and visit `http://localhost:3000` to view the application.



