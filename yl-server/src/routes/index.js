import express from 'express';
import {IndexController,WordController, AuthController,RedisController} from '../controllers/index.js'; // Adjust the path as necessary
import asyncHandler from '../utils/asyncHandler.js'

const router = express.Router();
const indexController = new IndexController();
const wordController = new WordController();
const authController = new AuthController(); // Assuming you have an AuthController for authentication
const redisController = new RedisController();

function setRoutes(app) {
    router.get('/', indexController.getIndex.bind(indexController));
    router.get('/search/:word', wordController.getMeaning.bind(wordController)); 
    router.get('/word/:word/definition', asyncHandler(wordController.getWordDefinition.bind(wordController)));
    router.post('/auth/signin', asyncHandler(authController.login.bind(authController)));
    router.post('/auth/signup', asyncHandler(authController.register.bind(authController)));
    router.post('/auth/refresh-token', asyncHandler(authController.silentSignIn.bind(authController))); 
    router.post('/auth/logout', asyncHandler(authController.logout.bind(authController))); 
    router.post('/redis/publish', async (req, res) => {
        console.log('Publishing message to Redis', req.body);
        // Assuming you have a method in RedisController to publish messages
        // Adjust the method name and parameters as necessary
        const { channel, message } = req.body;
        if (!channel || !message) {
            return res.status(400).json({ error: 'Channel and message are required' });
        }
        await redisController.publishMessage(channel, message);
        res.json({ status: 'Message published' });
    });
    router.get('/redis/trending-words', async (req, res) => {
        try {
            const trendingWords = await redisController.publishTrendingWords();
            res.json(trendingWords);
        } catch (error) {
            console.error('Error fetching trending words:', error);
            res.status(500).json({ error: 'Failed to fetch trending words' });
        }
    });
    router.post("/subscribe", async (req, res) => {
  const subscription = req.body;
  redisController.subscribeToWordOfTheDay(subscription);
  res.json({ message: "Subscribed successfully" });
});
router.get('/sendNotification', async (req, res) => {
    try {
        const payload = {
            title: 'Word of the Day',
            body: 'Check out the word of the day!',
            icon: '/icon.png', // Adjust the icon path as necessary
        };
        await redisController.sendNotification(payload);
        res.json({ status: 'Notification sent' });  
    } catch (error) {
        console.error('Error fetching word of the day:', error);
        res.status(500).json({ error: 'Failed to fetch word of the day' });
    }
});
    app.use('/', router);
}
export default setRoutes;