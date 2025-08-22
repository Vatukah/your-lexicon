import * as RedisService from "../services/redis/redis.service.js";
import { NotFoundError, ValidationError } from "../../error/appError.js";
import getWordInfo from "../services/lexicon/index.js";

class WordController {
  async getMeaning(req, res) {
    const { word } = req.params;

    if (!word) {
      return res.status(400).json({ error: "Word is required" });
    }
    try {
      // Increment the lookup count for this word in a sorted set
      // await RedisService.incrementLookupCount(word);

      // const cachedData = await RedisService.getWordFromRedis(word);

      // if (cachedData) {
      //   return res.json(cachedData);
      // }

      const result = await getWordInfo(word);
      console.log("Response from Lexicon API:", result);

      if (!result ) {
        throw new NotFoundError(`Definition not found for word: ${word}`);
      }

      // Cache the result in Redis
      // await RedisService.setWordInRedis(word, result);

      // response to user
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching word meaning:", error);
      throw new NotFoundError(`Definition not found for word: ${word}`);
    }
  }

  async getWordDefinition(req, res) {
    const { word } = req.params;

    if (!word) {
      throw new ValidationError("Word is required");
    }
    const definition = await getWordInfo(word);

    res.json(definition);
  }
}

export default WordController;
