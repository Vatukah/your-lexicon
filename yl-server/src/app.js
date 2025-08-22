import dotenv from 'dotenv/config.js'
 // Enable debug mode for dotenv
import express from 'express';
import cors from 'cors';
import setRoutes from './routes/index.js'; // Assuming you have a routes.js file to set up your routes
import cookieParser from 'cookie-parser';
import { Server} from 'socket.io';
import http from 'http';
import errorHandler from '../error/middleware/error.js';
import  { NotFoundError } from '../error/appError.js';
import { initRedis } from './config/redisClient.js';
const app = express();
const PORT = process.env.PORT || 3000;





// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL/port
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));





// Set up routes
setRoutes(app);
app.use((req, res, next) => {
    next(new NotFoundError(`Cannot find ${req.originalUrl}`, 404));
});
app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
    
});

// redisController.subscribeToChannel('word_updates', io);
// redisController.subscribeToChannel('news', io);
// redisController.subscribeToChannel('announcements', io);
// redisController.subscribeToChannel('general', io);

// const postTrendingWords = async () => {
//  await redisController.publishTrendingWords(io);
// }

// postTrendingWords();


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

initRedis();