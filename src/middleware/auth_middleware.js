import axios from "axios";
import { config } from "../../_config";

export const check_logged_in = async ()=>{

    let res
    try {
      res = await axios.get(config.API.USER_URL+'/', {
        headers: {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      })

    } catch (error) {
      console.log('check_logged_in',  error);
      return false
    }

    return true
}
