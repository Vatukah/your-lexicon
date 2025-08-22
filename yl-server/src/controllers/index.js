import WordController from "./wordController.js";
import AuthController from "./authController.js";
import RedisController from "./redisController.js";


class IndexController {
    getIndex(req, res) {
        res.send('Welcome to the YL Server!');
    }
}

export { IndexController, WordController, AuthController, RedisController };