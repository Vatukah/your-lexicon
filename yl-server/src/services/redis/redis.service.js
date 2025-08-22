import { getRedis } from "../../config/redisClient.js";


export const getWordFromRedis = async (word) => {
    const redisClient = getRedis();
  const result = await redisClient.get(`word:${word}`);
  return JSON.parse(result);
};

export const setWordInRedis = async (word, data) => {
    const redisClient = getRedis();
  await redisClient.set(`word:${word}`, JSON.stringify(data), { EX: 86400 }); // Set expiration to 1 day
};
// increment the lookup count for a word in sorted set
export const incrementLookupCount = async (word) => {
    const redisClient = getRedis();
  await redisClient.zincrby(`word_lookups`, 1, word);
};
