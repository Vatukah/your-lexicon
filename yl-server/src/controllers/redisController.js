import { getRedis } from "../config/redisClient.js";
import webpush from "../utils/webpush.js";
class RedisController {
  async publishMessage(channel, message) {
    const redisClient = getRedis();
    await redisClient.publish(channel, JSON.stringify(message));
  }

  async subscribeToChannel(channel,io) {
    const redisClient = getRedis();
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    await subscriber.subscribe(channel, (message, channel) => {
      console.log(`Received message from ${channel}: ${message}`);
      io.emit(channel, JSON.parse(message));
    });

   
  }
   async publishTrendingWords() {
    const redisClient = getRedis();
   
      const trendingWords = await redisClient.zRange('word_lookups', 0, -1, { REV: true, WITHSCORES: true });
    
      return trendingWords;
    }

   async subscribeToWordOfTheDay(subscription) {
    const redisClient = getRedis();
    await redisClient.sAdd("push_subscriptions", JSON.stringify(subscription));
  }

   async sendNotification( payload) {
    const redisClient = getRedis();
    const subscribers = await redisClient.sMembers("push_subscriptions");
    if (subscribers.length === 0) {
      console.log("No subscribers found");
      return;
    }
    
    subscribers.forEach(async (sub) => {
      try {
        await webpush.sendNotification(JSON.parse(sub), JSON.stringify(payload));
      } catch (error) {
        console.error('Error sending notification:', error);
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log('Unsubscribing user:', sub);
          await redisClient.sRem("push_subscriptions", sub);
        }
      }
    });
  }
}

export default RedisController;
