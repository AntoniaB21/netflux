import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.tvmaze.com/singlesearch/",
});
export default instance;