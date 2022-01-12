const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const config = {
  headers: {
    "api-key": process.env.API_KEY,
  },
};

exports.getUsedCars = async (params) =>
  await axios.get(`${process.env.API_PATH}?site=${params}`, config);
