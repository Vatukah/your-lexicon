import axios from "axios";
import parseOxfordResponse from "../../utils/lexicon/parseOxfordResponse.js";

const appId = process.env.OXFORD_APP_ID;
const appKey = process.env.OXFORD_APP_KEY;
const url = "https://od-api-sandbox.oxforddictionaries.com/api/v2/words/en-gb";



export default async function getOxfordData(word) {
  try {
    const query = `?q=${word}`;
    const response = await axios.get(url + query, {
      headers: {
        "Accept": "application/json",
        "app_id": appId,
        "app_key": appKey
      }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}
