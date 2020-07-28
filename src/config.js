import dotenv from "dotenv";
dotenv.config();

console.log("process.env", process.env);

export default {
  googleApiKey:
    //"AIzaSyBxgswoPm6raa1oW6pkW4P2A_V0IrZ4ApQ"
    process.env.REACT_APP_GOOGLE_API_KEY
};
