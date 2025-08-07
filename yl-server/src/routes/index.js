import express from 'express';
import {IndexController,WordController} from '../controllers/index.js'; // Adjust the path as necessary

const router = express.Router();
const indexController = new IndexController();
const wordController = new WordController();

function setRoutes(app) {
    router.get('/', indexController.getIndex.bind(indexController));
    router.get('/word/:word', wordController.getMeaning.bind(wordController)); 
    app.use('/', router);
}
export default setRoutes;