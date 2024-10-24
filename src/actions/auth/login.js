import axios from "axios";
import { useState } from "react";
import { config } from "../../../_config";

export const login =  ()=>{
  const [result,  setResult] = useState({
    error : false,
    status : 200,
    data : {}
  })
  const [loading, setLoading] = useState(false)

  const reset = ()=>{
    setResult({
      error : false,
      status : 200,
      data : {}
    })
    setLoading(false)
  }
  const toggleLoading = ()=> setLoading(e=> !e)

  const doLogin = async (username, password)=>{
    let res

    toggleLoading()
    try {
      res = await axios.post(config.API.GUEST_URL+'/auth/login/', {
        username,
        password
      })
      const res2 = res.data

      const token = res2.data.token
      localStorage.setItem('token', token)

      setResult({
        error : false,
        status : res.status,
        data : res.data
      })
    } catch (error) {

      setResult({
        error : true,
        status: error.status,
        data: error.response.data
      })
      console.error('doLogin', error)
    }

    toggleLoading()
  }

  return {
    result,
    loading,
    doLogin
  }
}
