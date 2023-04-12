import axios from "axios";
import { logOut } from "../redux/authSlice";

const authAxios = async (token, url, callback) => {
    const auth = axios.create({
      baseURL: 'http://localhost:5000/',
      headers: {
        token: token,
      }
    })
    await auth.get(url)
    .then((res) => {
      callback(res.data)
    })
    .catch((err) => {
      logOut();
      console.log('in auth:', err.response.data.msg);
      callback(err.response.data.msg);
    })
}

export default authAxios;