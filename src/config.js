import "dotenv/config.js";
console.log("process.env", process.env);

export default {
  googleApiKey:
    //"AIzaSyBxgswoPm6raa1oW6pkW4P2A_V0IrZ4ApQ"
    process.env.GOOGLE_API_KEY
};
