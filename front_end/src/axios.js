import axios from "axios";

const instance = axios.create({
  baseURL: "https://microfinance-cab4b.firebaseio.com/"
});

export default instance;
