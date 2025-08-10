import express from 'express';
import cors from 'cors';
import setRoutes from './routes/index.js'; // Assuming you have a routes.js file to set up your routes
import cookieParser from 'cookie-parser';
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});