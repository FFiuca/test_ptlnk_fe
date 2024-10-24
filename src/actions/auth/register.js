import axios from "axios";
import { useState } from "react";
import { config } from "../../../_config";

export const register =  ()=>{
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

  const doRegister = async ({
    username,
    name,
    password,
    passwordConfirm
  })=>{
    let res

    toggleLoading()
    try {
      res = await axios.post(config.API.GUEST_URL+'/auth/register', {
        username,
        name,
        password,
        password_confirm: passwordConfirm
      }, {
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      const res2 = res.data

      setResult({
        error : false,
        status : res.status,
        data : res.data
      })
    } catch (error) {

      setResult({
        error : true,
        status: error.status,
        data: error.response.data.data
      })
      console.error('doRegister', error)
    }

    toggleLoading()
  }

  return {
    result,
    loading,
    result,
    doRegister
  }
}
