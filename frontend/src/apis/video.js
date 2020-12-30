import axios from "axios";

// params probably helpful later once we make requests to the cdn
export default axios.create({
  baseURL: "http://localhost:5000",
});
