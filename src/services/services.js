import config from "../config";
import axios from "axios";

//console.log("config.googleApiKey", config.googleApiKey);

const googleBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=`;
const covidBaseUrl = "https://api.covid19api.com/summary";

export default {
  async getCountry(lat, lng) {
    try {
      const data = await axios.get(
        `${googleBaseUrl}${lat},${lng}&key=${config.googleApiKey}`
      );
      return data.data.results;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async getInfo() {
    try {
      const data = await axios.get(`${covidBaseUrl}`);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
